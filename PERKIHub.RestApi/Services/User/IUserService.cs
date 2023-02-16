using ErrorOr;
using PERKIHub.Domain.Entities;

namespace PERKIHub.RestApi.Services;

public interface IUserService
{
  List<User> GetUsers();
  ErrorOr<User> GetUser(Guid id);
  Task<ErrorOr<Updated>> UpsertUser(User user);
}