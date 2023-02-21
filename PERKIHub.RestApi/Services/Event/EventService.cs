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

  public async Task<ErrorOr<Updated>> UpsertEvent(Event _event)
  {
    _context.PH_EventDef.Update(_event);

    await _context.SaveChangesAsync();

    return Result.Updated;
  }

  public async Task<ErrorOr<Deleted>> DeleteEvent(Guid id)
  {
    var _event = _context.PH_EventDef.Find(id);
    _context.PH_EventDef.Remove(_event!);

    await _context.SaveChangesAsync();
    return Result.Deleted;
  }
}