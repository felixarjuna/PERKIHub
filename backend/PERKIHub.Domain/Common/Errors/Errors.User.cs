using ErrorOr;

namespace PERKIHub.Domain.Common.Errors;
public static partial class Errors
{
  public static class User
  {
    public static Error DuplicateEmail => Error.Conflict(
      code: "User.DuplicateEmail",
      description: "Email is already in use.");

    public static Error NotFound => Error.NotFound(
      code: "User.NotFound",
      description: "User not found.");

    public static Error ProfilePictureTooBig => Error.Failure(
      code: "User:ProfilePictureTooLarge",
      description: "Profile picture file too big."
    );
  }
}