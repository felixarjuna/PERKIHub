using ErrorOr;
using Microsoft.AspNetCore.Mvc;
using PERKIHub.Contracts.Event;
using PERKIHub.Domain.Entities;
using PERKIHub.RestApi.Services;

namespace PERKIHub.RestApi.Controllers;

[Route("api/[controller]")]
public class EventsController : ApiController
{
  private readonly IEventService _eventService;

  public EventsController(IEventService eventService)
  {
    _eventService = eventService;
  }

  [HttpPost]
  public async Task<IActionResult> CreateEventAsync(CreateEventRequest request)
  {
    var _event = Event.Create(
      request.Title,
      request.Date,
      request.Speaker,
      request.Topic);

    ErrorOr<Created> result = await _eventService.CreateEvent(_event);

    return result.Match(
      (res) => CreatedAtAction(
        actionName: nameof(GetEvent),
        routeValues: new { id = _event.ID },
        value: _event),
      (err) => Problem(err));
  }

  [HttpGet]
  public IActionResult GetEvents()
  {
    var result = _eventService.GetEvents();
    return Ok(result);
  }

  [HttpGet("{id}")]
  public IActionResult GetEvent(Guid id)
  {
    var result = _eventService.GetEvent(id);

    return result.Match(
      (res) => Ok(new EventResponse(
        res.ID,
        res.Title,
        res.Date,
        res.Speaker,
        res.Topic,
        res.Participants)),
      err => Problem(err));
  }

  [HttpPut("{id}")]
  public async Task<IActionResult> UpsertEvent(Guid id, UpsertEventRequest request)
  {
    if (id != request.ID)
    {
      return BadRequest();
    }

    var _event = Domain.Entities.Event.Create(
      request.ID,
      request.Title,
      request.Date,
      request.Speaker,
      request.Topic);

    var result = await _eventService.UpsertEvent(_event);
    return result.Match(
      (res) => res.IsNewlyCreated
        ? CreatedAtAction(
          actionName: nameof(GetEvent),
          routeValues: new { id = _event.ID },
          value: _event)
        : NoContent(),
      err => Problem(err));
  }

  [HttpDelete("{id}")]
  public async Task<IActionResult> DeleteEvent(Guid id)
  {
    ErrorOr<Deleted> result = await _eventService.DeleteEvent(id);
    return result.Match(
      (res) => NoContent(),
      err => Problem(err));
  }

  [HttpPost("join")]
  public async Task<IActionResult> JoinEvent(JoinEventRequest request)
  {
    ErrorOr<Event> result = await _eventService.JoinEvent(
      request.Id,
      request.Username);

    return result.Match(
      (res) => Ok(res),
      err => Problem(err));
  }
}