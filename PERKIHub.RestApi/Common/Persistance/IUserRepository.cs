using PERKIHub.Domain.Entities;

namespace PERKIHub.RestApi.Common.Persistance;

public interface IUserRepository
{
  User? GetUserByEmail(string email);
  void Add(User user);
}