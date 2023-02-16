namespace PERKIHub.Contracts.User;

public record UserResponse(
  Guid ID,
  string FirstName,
  string LastName,
  string Email,
  string Token
);