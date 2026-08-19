import { Student } from "@/domain/forum/enterprise/entities/student"
import { Prisma, User } from "generated/prisma/client"
import { UniqueEntityId } from "@/core/entities/unique-entity-id"

export class PrismStudentMapper {
  static toDomain(raw: User): Student {
    return Student.create({
      name: raw.name,
      email: raw.email,
      password: raw.password,
    }, new UniqueEntityId(raw.id))
  }

  static toPersitence(student: Student): Prisma.UserUncheckedCreateInput {
    return {
      id: student.id.toString(),
      name: student.name,
      email: student.email,
      password: student.password,
    }
  }
}