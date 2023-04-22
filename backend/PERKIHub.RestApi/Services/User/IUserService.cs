using ErrorOr;
using Microsoft.AspNetCore.Mvc;
using PERKIHub.Domain.Entities;

namespace PERKIHub.RestApi.Services;

public interface IUserService
{
  List<UserResult> GetUsers();
  ErrorOr<UserResult> GetUser(Guid id);
  Task<ErrorOr<Updated>> UpsertUser(Guid ID, string firstname, string lastname, string email, string passwor);
  Task<ErrorOr<Deleted>> DeleteUser(Guid id);
  ProfilePicture? GetProfilePicture(Guid userID);
  Task<ErrorOr<UpsertedProfilePicture>> UpsertProfilePicture(Guid userID, IFormFile profilePicture);
}