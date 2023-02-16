using ErrorOr;
using PERKIHub.Domain.Common.Errors;
using PERKIHub.Domain.Entities;
using PERKIHub.RestApi.Common.Persistance;

namespace PERKIHub.RestApi.Services;

public class UserService : IUserService
{
  private readonly IUserRepository _userRepository;

  public UserService(IUserRepository userRepository)
  {
    _userRepository = userRepository;
  }

  public List<User> GetUsers()
  {
    return _userRepository.GetUsers();
  }

  public ErrorOr<User> GetUser(Guid id)
  {
    // Check if user exist
    if (_userRepository.GetUserByID(id) is not User user)
    {
      return Errors.User.NotFound;
    }
    return user;
  }
}