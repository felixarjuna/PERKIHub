using Microsoft.AspNetCore.Mvc;

namespace PERKIHub.RestApi.Controllers;

public class ErrorsController : ControllerBase
{
  [Route("/error")]
  public IActionResult Error()
  {
    return Problem();
  }
}