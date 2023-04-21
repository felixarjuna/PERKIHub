export class User {
  private id: string;
  private firstName: string;
  private lastName: string;
  private email: string;

  constructor(id: string, firstName: string, lastName: string, email: string) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
  }
}
