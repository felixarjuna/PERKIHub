using Microsoft.EntityFrameworkCore;
using PERKIHub.RestApi;
using PERKIHub.RestApi.Persistence;
using Microsoft.Extensions.Configuration;

var allowAllOrigins = "_allowAllOrigins";

var builder = WebApplication.CreateBuilder(args);
{
  builder.Services.AddCors(options =>
  {
    options.AddPolicy(
      name: allowAllOrigins,
      builder => builder
        .WithOrigins("*")
        .AllowAnyMethod()
        .AllowAnyHeader());
  });

  // Add services to the container.
  builder.Services.AddControllers();
  // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
  builder.Services.AddEndpointsApiExplorer();
  builder.Services.AddSwaggerGen();
  builder.Services.AddServices(builder.Configuration);

  builder.Services.AddDbContext<PerkiHubDbContext>();
}

var app = builder.Build();
{
  app.UseExceptionHandler("/error");
  // Configure the HTTP request pipeline.
  if (app.Environment.IsDevelopment())
  {
    app.UseSwagger();
    app.UseSwaggerUI();
  }

  app.UseHttpsRedirection();
  app.UseCors(allowAllOrigins);
  app.UseAuthorization();

  app.MapControllers();

  app.Run();
}