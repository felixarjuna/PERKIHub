using ErrorOr;
using PERKIHub.Domain.Common.Errors;
using PERKIHub.Domain.Entities;
using PERKIHub.RestApi.Common.Persistance;
using PERKIHub.RestApi.Persistence;

namespace PERKIHub.RestApi.Services;

public class UserService : IUserService
{
  private readonly PerkiHubDbContext _context;
  private readonly IUserRepository _userRepository;

  public UserService(IUserRepository userRepository, PerkiHubDbContext context)
  {
    _userRepository = userRepository;
    _context = context;
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

  public async Task<ErrorOr<Updated>> UpsertUser(User user)
  {
    // Check if user already exists
    if (_userRepository.GetUserByID(user.ID) is null)
    {
      return Errors.User.NotFound;
    }

    await _userRepository.Upsert(user);
    return Result.Updated;
  }

  public async Task<ErrorOr<Deleted>> DeleteUser(Guid id)
  {
    if (_userRepository.GetUserByID(id) is null)
    {
      return Errors.User.NotFound;
    }

    await _userRepository.Delete(id);
    return Result.Deleted;
  }
}