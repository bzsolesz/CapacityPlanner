export class Child {
  constructor(
    private _id: number,
    private _firstName: string,
    private _surname: string,
    private _dateOfBirth: string
  ) {}

  get id(): number {
    return this._id;
  }

  get firstName(): string {
    return this._firstName;
  }

  get surname(): string {
    return this._surname;
  }

  get dateOfBirth(): string {
    return this._dateOfBirth;
  }

  set firstName(firstName: string) {
    this._firstName = firstName;
  }

  set surname(surname: string) {
    this._surname = surname;
  }

  set dateOfBirth(dateOfBirth: string) {
    this._dateOfBirth = dateOfBirth;
  }
}
