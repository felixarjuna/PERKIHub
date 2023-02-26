namespace PERKIHub.RestApi.Common.Services;

public interface IDateTimeProvider
{
  DateTime UtcNow { get; }
}