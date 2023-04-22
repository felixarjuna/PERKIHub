export class User {
  private id: string;
  private firstName: string;
  private lastName: string;
  private email: string;
  private profilePicture: Blob;

  constructor(
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    profilePicture: Blob
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.profilePicture = profilePicture;
  }
}
