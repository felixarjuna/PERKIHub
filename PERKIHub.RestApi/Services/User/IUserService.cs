using ErrorOr;
using PERKIHub.Domain.Entities;

namespace PERKIHub.RestApi.Services;

public interface IUserService
{
  List<User> GetUsers();
}