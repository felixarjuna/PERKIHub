using PERKIHub.Domain.Entities;

namespace PERKIHub.RestApi.Common.Persistance;

public class UserRepository : IUserRepository
{
  private static readonly List<User> _users = new();

  public void Add(User user)
  {
    _users.Add(user);
  }

  public User? GetUserByEmail(string email)
  {
    return _users.SingleOrDefault(u => u.Email == email);
  }

  public List<User> GetUsers()
  {
    return _users;
  }
}