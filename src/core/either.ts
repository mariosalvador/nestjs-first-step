

//Error
class Left<L, R> {
  readonly value: any;

  constructor(value: L) {
    this.value = value;
  }
  isRigth(): this is Right<L, R> {
    return false;
  }

  isLeft(): this is Left<L, R> {
    return true;
  }
}


// SUCEESS
class Right<L, R> {
  readonly value: any;

  constructor(value: R) {
    this.value = value;
  }
  isRigth(): this is Right<L, R> {
    return true;
  }

  isLeft(): this is Left<L, R> {
    return false;
  }
}

export type Either<L, R> = Left<L, R> | Right<L, R>;

//essa sintaxe é uma forma de criar um singleton, ou seja, uma instância única da classe Right
export const left = <L, R>(value: L): Either<L, R> => new Left(value);
export const right = <L, R>(value: R): Either<L, R> => new Right(value);