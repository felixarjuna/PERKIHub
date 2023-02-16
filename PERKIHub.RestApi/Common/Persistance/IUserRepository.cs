using PERKIHub.Domain.Entities;

namespace PERKIHub.RestApi.Common.Persistance;

public interface IUserRepository
{
  User? GetUserByEmail(string email);
  User? GetUserByID(Guid id);
  Task Add(User user);
  List<User> GetUsers();
}