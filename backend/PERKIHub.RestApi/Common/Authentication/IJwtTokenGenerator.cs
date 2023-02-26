using PERKIHub.Domain.Entities;

namespace PERKIHub.RestApi.Common.Interfaces.Authentication;

public interface IJwtTokenGenerator
{
  string GenerateToken(User user);
}