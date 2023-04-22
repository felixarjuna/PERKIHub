using ErrorOr;
using Microsoft.AspNetCore.Mvc;
using PERKIHub.Contracts.User;
using PERKIHub.RestApi.Services;

namespace PERKIHub.RestApi.Controllers;

[Route("api/[controller]")]
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
  public IActionResult GetUser(Guid id)
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
  public async Task<IActionResult> UpsertUser(Guid id, UpsertUserRequest request)
  {
    if (id != request.ID)
    {
      return BadRequest();
    }

    var result = await _userService.UpsertUser(
      request.ID,
      request.FirstName,
      request.LastName,
      request.Email,
      request.Password);

    return result.Match(
      (res) => Ok(new UserResponse(
        request.ID,
        request.FirstName,
        request.LastName,
        request.Email,
        "")),
      err => Problem(err));
  }

  [HttpDelete("{id}")]
  public async Task<IActionResult> DeleteUserAsync(Guid id)
  {
    ErrorOr<Deleted> result = await _userService.DeleteUser(id);
    return result.Match(
      (res) => NoContent(),
      err => Problem(err));
  }

  [HttpPost("profile-picture/{id}")]
  public async Task<IActionResult> UpsertProfilePicture(Guid id, [FromForm] UpsertProfilePictureRequest request)
  {
    ErrorOr<UpsertedProfilePicture> result = await _userService.UpsertProfilePicture(id, request.ProfilePicture);

    return result.Match(
      (res) => res.IsNewlyCreated ? CreatedAtAction(
        actionName: nameof(GetUser),
        routeValues: new { id = request.ID },
        value: request.ProfilePicture) : NoContent(),
      (err) => Problem(err));
  }

  [HttpGet("profile-picture/{id}")]
  public IActionResult GetProfilePicture(Guid id)
  {
    var result = _userService.GetProfilePicture(id);
    if (result is not null) return new FileContentResult(result.File, result.ContentType);
    return Ok();
  }
}