using PERKIHub.Domain.Entities;

namespace PERKIHub.RestApi.Common.Persistance;

public interface IUserRepository
{
  User? GetUserByEmail(string email);
  Task Add(User user);
  List<User> GetUsers();
}