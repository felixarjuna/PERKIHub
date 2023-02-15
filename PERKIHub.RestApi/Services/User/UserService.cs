using ErrorOr;
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
}