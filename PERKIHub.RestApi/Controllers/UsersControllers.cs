using Microsoft.AspNetCore.Mvc;
using PERKIHub.Contracts.User;
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

  [HttpGet("{id}")]
  public IActionResult GetUsers(Guid id)
  {
    var result = _userService.GetUser(id);

    return result.Match(
      (res) => Ok(new UserResponse(
        res.ID,
        res.FirstName,
        res.LastName,
        res.Email,
        res.Password)),
      err => Problem(err));
  }

  [HttpPut("{id}")]
  public async Task<IActionResult> UpsertUserAsync(Guid id, UpsertUserRequest request)
  {
    if (id != request.ID)
    {
      return BadRequest();
    }

    var user = Domain.Entities.User.Create(
      request.ID,
      request.FirstName,
      request.LastName,
      request.Email,
      request.Password);

    var result = await _userService.UpsertUser(user);
    return result.Match(
      (res) => NoContent(),
      err => Problem(err));
  }
}