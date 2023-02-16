using PERKIHub.Domain.Entities;
using PERKIHub.RestApi.Persistence;

namespace PERKIHub.RestApi.Common.Persistance;

public class UserRepository : IUserRepository
{
  private readonly PerkiHubDbContext _context;

  public UserRepository(PerkiHubDbContext context)
  {
    _context = context;
  }

  public async Task Add(User user)
  {
    _context.PH_UserDef.Add(user);
    await _context.SaveChangesAsync();
  }

  public User? GetUserByEmail(string email)
  {
    return _context.PH_UserDef.FirstOrDefault(u => u.Email == email);
  }

  public List<User> GetUsers()
  {
    return _context.PH_UserDef.ToList();
  }
}