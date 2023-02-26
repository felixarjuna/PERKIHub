namespace PERKIHub.Contracts.Event;

public record EventResponse(
  Guid ID,
  string Title,
  DateTime Date,
  string Speaker,
  string Topic,
  List<string>? Participants
);