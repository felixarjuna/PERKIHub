namespace PERKIHub.RestApi.Common.Services;

public class DateTimeProvider : IDateTimeProvider
{
  public DateTime UtcNow => DateTime.UtcNow;
}