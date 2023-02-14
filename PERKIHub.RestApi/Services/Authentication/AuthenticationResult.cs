using PERKIHub.Domain.Entities;

namespace PERKIHub.RestApi.Services.Authentication;

public record AuthenticationResult(
  User User,
  string Token
);