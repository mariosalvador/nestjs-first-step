


export abstract class ValueObject<T> {
  protected props: T

  constructor(props: T) {
    this.props = props
  }

  equals(value: ValueObject<T>): boolean {
    if (value === null || value === undefined) {
      return false
    }

    if (value.props === undefined) {
      return false
    }
    return JSON.stringify(value.props) === JSON.stringify(this.props)
  }
}