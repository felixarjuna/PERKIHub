using ErrorOr;

namespace PERKIHub.Domain.Common.Errors;
public static partial class Errors
{
  public static class Event
  {
    public static Error NotFound => Error.NotFound(
      code: "Event.NotFound",
      description: "Event not found.");

    public static Error UserAlreadyJoinEvent => Error.Failure(
      code: "Event:UserAlreadyJoinEvent",
      description: "Join event failed. You already participated."
    );
  }
}