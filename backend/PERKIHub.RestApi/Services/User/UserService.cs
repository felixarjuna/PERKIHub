using ErrorOr;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PERKIHub.Domain.Common.Errors;
using PERKIHub.Domain.Entities;
using PERKIHub.RestApi.Common.Persistance;
using PERKIHub.RestApi.Persistence;
using static System.Net.Mime.MediaTypeNames;

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

  public List<UserResult> GetUsers()
  {
    List<User> users = _userRepository.GetUsers();
    return users.Select((u) =>
    {
      // var contentType = "image/svg+xml";
      // var contentResult = new FileContentResult(u.ProfilePicture, contentType);
      // using var stream = new MemoryStream(u.ProfilePicture);
      return new UserResult(
       u.ID,
       u.FirstName,
       u.LastName,
       u.Email,
       u.Password,
       null
      );
    }).ToList();

  }

  public ErrorOr<UserResult> GetUser(Guid id)
  {
    // Check if user exist
    if (_userRepository.GetUserByID(id) is not User user)
    {
      return Errors.User.NotFound;
    }
    var contentType = "image/svg+xml";
    // var contentResult = new FileContentResult(user.ProfilePicture, contentType);
    return new UserResult(user.ID, user.FirstName, user.LastName, user.Email, user.Password, null);
  }

  public async Task<ErrorOr<Updated>> UpsertUser(
    Guid ID,
    string firstname,
    string lastname,
    string email,
    string password)
  {
    // Check if user already exists
    if (_userRepository.GetUserByID(ID) is null)
    {
      return Errors.User.NotFound;
    }

    User user = User.Create(ID, firstname, lastname, email, password);
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

  public async Task<ErrorOr<UpsertedProfilePicture>> UpsertProfilePicture(Guid userID, IFormFile profilePicture)
  {
    using var memoryStream = new MemoryStream();
    await profilePicture.CopyToAsync(memoryStream);
    if (memoryStream.Length < 2097152)
    {
      var content = memoryStream.ToArray();
      var picture = ProfilePicture.Create(userID, profilePicture.ContentType, content);
      // Check if pp already exists
      var isNew = !_context.PH_ProfilePictureDef.Any((x) => x.UserID == userID);
      if (isNew) _context.PH_ProfilePictureDef.Add(picture);
      else
      {
        var _picture = _context.PH_ProfilePictureDef.AsNoTracking().First(p => p.UserID == userID);
        picture.ID = _picture.ID;
        _context.PH_ProfilePictureDef.Update(picture);
      }

      _context.SaveChanges();

      return new UpsertedProfilePicture(isNew);
    }
    return Errors.User.ProfilePictureTooBig;
  }

  public ProfilePicture? GetProfilePicture(Guid userID)
  {
    return _context.PH_ProfilePictureDef.FirstOrDefault(p => p.UserID == userID);
  }
}