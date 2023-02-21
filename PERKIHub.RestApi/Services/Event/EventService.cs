using ErrorOr;
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

  public async Task<ErrorOr<Created>> CreateEvent(Event _event)
  {
    _context.PH_EventDef.Add(_event);
    await _context.SaveChangesAsync();

    return Result.Created;
  }

  public List<Event> GetEvents()
  {
    return _context.PH_EventDef.ToList();
  }

  public ErrorOr<Event> GetEvent(Guid id)
  {
    var _event = _context.PH_EventDef.Find(id);
    return _event ?? (ErrorOr<Event>)Errors.Event.NotFound;
  }

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
}