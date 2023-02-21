using ErrorOr;
using PERKIHub.Domain.Entities;
using PERKIHub.RestApi.Persistence;

namespace PERKIHub.RestApi.Services;

public class EventService : IEventService
{
  private readonly PerkiHubDbContext _context;

  public ErrorOr<Created> CreateEvent(Event _event)
  {
    throw new NotImplementedException();
  }

  public List<Event> GetEvents()
  {
    throw new NotImplementedException();
  }

  public ErrorOr<Event> GetEvent(Guid id)
  {
    throw new NotImplementedException();
  }

  public ErrorOr<Updated> UpsertEvent(Event _event)
  {
    throw new NotImplementedException();
  }

  public ErrorOr<Deleted> DeleteEvent(Guid id)
  {
    throw new NotImplementedException();
  }
}