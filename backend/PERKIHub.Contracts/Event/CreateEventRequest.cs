namespace PERKIHub.Contracts.Event;

public record CreateEventRequest(
  string Title,
  DateTime Date,
  string Speaker,
  string Topic
);