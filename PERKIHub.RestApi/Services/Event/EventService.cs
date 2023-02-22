using ErrorOr;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PERKIHub.Domain.Common.Errors;
using PERKIHub.Domain.Entities;
using PERKIHub.RestApi.Persistence;

namespace PERKIHub.RestApi.Services;

public class EventService : IEventService
{
  private readonly PerkiHubDbContext _context;

  public EventService(PerkiHubDbContext context)
  {
    _context = context;
  }

  [HttpPost]
  public async Task<ErrorOr<Created>> CreateEvent(Event _event)
  {
    _context.PH_EventDef.Add(_event);
    await _context.SaveChangesAsync();

    return Result.Created;
  }

  [HttpGet]
  public List<Event> GetEvents()
  {
    return _context.PH_EventDef.ToList();
  }

  [HttpGet("{id}")]
  public ErrorOr<Event> GetEvent(Guid id)
  {
    var _event = _context.PH_EventDef.Find(id);
    return _event ?? (ErrorOr<Event>)Errors.Event.NotFound;
  }

  [HttpPut("{id}")]
  public async Task<ErrorOr<UpsertedEvent>> UpsertEvent(Event _event)
  {
    var isNew = !_context.PH_EventDef.Any((x) => x.ID == _event.ID);

    if (isNew)
    {
      _context.PH_EventDef.Add(_event);
    }
    else
    {
      _context.PH_EventDef.Update(_event);
    }

    await _context.SaveChangesAsync();

    return new UpsertedEvent(isNew);
  }

  [HttpDelete("{id}")]
  public async Task<ErrorOr<Deleted>> DeleteEvent(Guid id)
  {
    var _event = _context.PH_EventDef.Find(id);

    if (_event is null)
    {
      return Errors.Event.NotFound;
    }

    _context.PH_EventDef.Remove(_event);
    await _context.SaveChangesAsync();

    return Result.Deleted;
  }

  public async Task<ErrorOr<Event>> JoinEvent(Guid id, string username)
  {
    var _event = _context
      .PH_EventDef
      .AsNoTracking()
      .First(e => e.ID == id);

    if (_event is null) return Errors.Event.NotFound;

    if (_event.Participants.Contains(username))
    {
      return Errors.Event.UserAlreadyJoinEvent;
    }

    List<string> participants = _event.Participants;
    // Check if user already participated

    participants.Add(username);

    var updateEvent = Event.Create(
      _event.ID,
      _event.Title,
      _event.Date,
      _event.Speaker,
      _event.Topic,
      participants);

    _context.PH_EventDef.Update(updateEvent);
    await _context.SaveChangesAsync();

    return updateEvent;
  }
}