namespace PERKIHub.Contracts.Event;

public record JoinEventRequest(
  Guid Id,
  string Username
);