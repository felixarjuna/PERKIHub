using ErrorOr;
using Microsoft.AspNetCore.Mvc;
using PERKIHub.Contracts.Authentication;
using PERKIHub.Domain.Common.Errors;
using PERKIHub.RestApi.Services.Authentication;

namespace PERKIHub.RestApi.Controllers;

[Route("auth")]
public class AuthenticationController : ApiController
{
  private readonly IAuthenticationService _authService;

  public AuthenticationController(IAuthenticationService authService)
  {
    _authService = authService;
  }

  [HttpPost("register")]
  public IActionResult Register(RegisterRequest request)
  {
    ErrorOr<AuthenticationResult> result = _authService.Register(
      request.FirstName,
      request.LastName,
      request.Email,
      request.Password);

    return result.Match(
      (res) => Ok(new AuthenticationResponse(
        res.User.ID,
        res.User.FirstName,
        res.User.LastName,
        res.User.Email,
        res.Token)),
      (err) => Problem(err));
  }

  [HttpPost("login")]
  public IActionResult Login(LoginRequest request)
  {
    ErrorOr<AuthenticationResult> result = _authService.Login(request.Email, request.Password);

    if (result.IsError && result.FirstError == Errors.Authentication.InvalidCredentials)
    {
      return Problem(statusCode: StatusCodes.Status401Unauthorized, title: result.FirstError.Description);
    }

    return result.Match(
      (res) => Ok(new AuthenticationResponse(
        res.User.ID,
        res.User.FirstName,
        res.User.LastName,
        res.User.Email,
        res.Token)),
      (err) => Problem(err));
  }
}
