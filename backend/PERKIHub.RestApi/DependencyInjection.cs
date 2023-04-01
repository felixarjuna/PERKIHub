using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using PERKIHub.RestApi.Common.Authentication;
using PERKIHub.RestApi.Common.Interfaces.Authentication;
using PERKIHub.RestApi.Common.Persistance;
using PERKIHub.RestApi.Common.Services;
using PERKIHub.RestApi.Services;
using PERKIHub.RestApi.Services.Authentication;

namespace PERKIHub.RestApi;

public static class DependencyInjection
{
  public static IServiceCollection AddServices(
    this IServiceCollection services,
    ConfigurationManager configuration)
  {
    services.AddAuth(configuration);
    services.AddScoped<IAuthenticationService, AuthenticationService>();
    services.AddScoped<IUserRepository, UserRepository>();
    services.AddScoped<IUserService, UserService>();
    services.AddScoped<IEventService, EventService>();

    services.AddSingleton<IDateTimeProvider, DateTimeProvider>();

    return services;
  }

  public static IServiceCollection AddAuth(
    this IServiceCollection services,
    ConfigurationManager configuration)
  {
    var jwtSettings = new JwtSettings();
    configuration.Bind(JwtSettings.SectionName, jwtSettings);

    services.AddSingleton(Options.Create(jwtSettings));
    services.AddSingleton<IJwtTokenGenerator, JwtTokenGenerator>();

    services.AddAuthentication(defaultScheme: JwtBearerDefaults.AuthenticationScheme)
      .AddJwtBearer(options => options.TokenValidationParameters = new TokenValidationParameters
      {
        ValidateIssuer = true,
        ValidIssuer = jwtSettings.Issuer,
        ValidateAudience = true,
        ValidAudience = jwtSettings.Audience,
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Secret))
      });

    return services;
  }
}