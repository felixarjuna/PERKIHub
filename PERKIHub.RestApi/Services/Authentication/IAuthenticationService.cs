using ErrorOr;
using PERKIHub.Contracts.Authentication;

namespace PERKIHub.RestApi.Services.Authentication;

public interface IAuthenticationService
{
  ErrorOr<AuthenticationResult> Login(string email, string password);
  ErrorOr<AuthenticationResult> Register(string firstName, string lastname, string email, string password);
}