using ErrorOr;
using PERKIHub.Domain.Entities;

namespace PERKIHub.RestApi.Services;

public interface IEventService
{
  Task<ErrorOr<Created>> CreateEvent(Event _event);
  List<Event> GetEvents();
  ErrorOr<Event> GetEvent(Guid id);
  Task<ErrorOr<Updated>> UpsertEvent(Event _event);
  Task<ErrorOr<Deleted>> DeleteEvent(Guid id);
}