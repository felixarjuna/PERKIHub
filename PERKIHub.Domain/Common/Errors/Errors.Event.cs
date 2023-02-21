using ErrorOr;

namespace PERKIHub.Domain.Common.Errors;
public static partial class Errors
{
  public static class Event
  {
    public static Error NotFound => Error.NotFound(
      code: "Event.NotFound",
      description: "Event not found.");
  }
}