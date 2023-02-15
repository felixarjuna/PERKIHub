using Microsoft.AspNetCore.Mvc;
using PERKIHub.RestApi.Common.Persistance;
using PERKIHub.RestApi.Services;

namespace PERKIHub.RestApi.Controllers;

[Route("[controller]")]
public class UsersController : ApiController
{
  private readonly IUserService _userService;

  public UsersController(IUserService userService)
  {
    _userService = userService;
  }

  [HttpGet]
  public IActionResult GetUsers()
  {
    var result = _userService.GetUsers();
    return Ok(result);
  }
}