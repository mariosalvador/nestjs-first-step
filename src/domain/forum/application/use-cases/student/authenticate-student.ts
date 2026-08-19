import { Either, left, right } from "@/core/either";
import { StudentRepository } from "../../repositories/student-repository";
import { Hasher } from "../../repositories/cryptography/hasher";
import { WrongCredentialsError } from "../errors/wrongs-credentials-error";
import { Encrypter } from "../../repositories/cryptography/encrypter";


interface AuthenticateStudentRequest {
  email: string;
  password: string;
}

type AuthenticateStudentResponse = Either<WrongCredentialsError, { accessToken: string }>

export class AuthenticateStudentUseCase {
  constructor(
    private readonly studentRepository: StudentRepository,
    private readonly hasher: Hasher,
    private readonly encrypter: Encrypter,
  ) { }

  async execute({ email, password }: AuthenticateStudentRequest): Promise<AuthenticateStudentResponse> {
    const student = await this.studentRepository.findByEmail(email);

    if (!student) {
      return left(new WrongCredentialsError());
    }

    const isPasswordValid = await this.hasher.compare(password, student.password);
    if (!isPasswordValid) {
      return left(new WrongCredentialsError());
    }

    const accessToken = await this.encrypter.encrypt({ sub: student.id.toString() });

    return right({ accessToken });
  }
}