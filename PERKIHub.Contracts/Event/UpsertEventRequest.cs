namespace PERKIHub.Contracts.Event;

public record UpsertEventRequest(
  Guid ID,
  string Title,
  DateTime Date,
  string Speaker,
  string Topic
);