using PERKIHub.RestApi.Common.Authentication;
using PERKIHub.RestApi.Common.Interfaces.Authentication;
using PERKIHub.RestApi.Common.Persistance;
using PERKIHub.RestApi.Common.Services;
using PERKIHub.RestApi.Services;
using PERKIHub.RestApi.Services.Authentication;

namespace PERKIHub.RestApi;

public static class DependencyInjection
{
  public static IServiceCollection AddServices(this IServiceCollection services, ConfigurationManager configuration)
  {
    services.Configure<JwtSettings>(configuration.GetSection(JwtSettings.SectionName));

    services.AddScoped<IAuthenticationService, AuthenticationService>();
    services.AddScoped<IUserRepository, UserRepository>();
    services.AddScoped<IUserService, UserService>();

    services.AddSingleton<IJwtTokenGenerator, JwtTokenGenerator>();
    services.AddSingleton<IDateTimeProvider, DateTimeProvider>();

    return services;
  }
}