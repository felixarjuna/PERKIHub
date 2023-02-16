namespace PERKIHub.Contracts.User;

public record UpsertUserRequest(
  Guid ID,
  string FirstName,
  string LastName,
  string Email,
  string Password
);