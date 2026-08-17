import { Entity } from "@/core/entities/entity";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

interface InstrutorProps {
  name: string;
  id?: string;
}
export class Instrutor extends Entity<InstrutorProps> {


  static create(props: InstrutorProps, id?: UniqueEntityId) {
    const instrutor = new Instrutor({
      ...props,
    }, id);

    return instrutor;
  }
}