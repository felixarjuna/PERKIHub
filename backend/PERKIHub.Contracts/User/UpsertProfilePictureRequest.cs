using Microsoft.AspNetCore.Http;

namespace PERKIHub.Contracts.User;

public record UpsertProfilePictureRequest(
  Guid ID,
  IFormFile ProfilePicture
);