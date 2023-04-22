using Microsoft.AspNetCore.Mvc;

namespace PERKIHub.RestApi.Services;

public record UserResult(
  Guid ID,
  string FirstName,
  string LastName,
  string Email,
  string Password,
  FileContentResult? ProfilePicture = null
);