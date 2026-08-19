import { Either, left, right } from "@/core/either";
import { Student } from "@/domain/forum/enterprise/entities/student";
import { StudentRepository } from "../../repositories/student-repository";
import { Hasher } from "../../repositories/cryptography/hasher";
import { StudentAlreadyExistsError } from "../errors/student-already-exist-error";

interface RegisterStudentRequest {
  name: string;
  email: string;
  password: string;
}

type RegisterStudentResponse = Either<StudentAlreadyExistsError, { student: Student }>

export class RegisterStudentUseCase {
  constructor(
    private readonly studentRepository: StudentRepository,
    private readonly hasher: Hasher,
  ) { }

  async execute({ email, name, password }: RegisterStudentRequest): Promise<RegisterStudentResponse> {

    const studentWithSameEmail = await this.studentRepository.findByEmail(email);

    if (studentWithSameEmail) {
      return left(new StudentAlreadyExistsError());
    }

    const hashedPassword = await this.hasher.hash(password);
    const user = Student.create({
      name,
      email,
      password: hashedPassword,
    });

    return right({ student: user });
  }
}