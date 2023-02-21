using System;
namespace PERKIHub.Domain.Entities;

public sealed class Event
{
  public Guid ID { get; set; } = Guid.NewGuid();
  public string Title { get; set; } = null!;
  public DateTime Date { get; set; }
  public string Speaker { get; set; } = null!;
  public string Topic { get; set; } = null!;
  public List<string>? Participants { get; set; }

  private Event() { }

  private Event(
    string title,
    DateTime date,
    string speaker,
    string topic,
    Guid? id)
  {
    Title = title;
    Date = date;
    Speaker = speaker;
    Topic = topic;
    ID = id ?? Guid.NewGuid();
  }

  public static Event Create(
    Guid id,
    string title,
    DateTime date,
    string speaker,
    string topic
  )
  {
    return new Event(title, date, speaker, topic, id);
  }

  public static Event Create(
    string title,
    DateTime date,
    string speaker,
    string topic
  )
  {
    return new Event(title, date, speaker, topic, null);
  }
}