using System.Runtime.CompilerServices;
using PERKIHub.RestApi;

var builder = WebApplication.CreateBuilder(args);
{
  builder.Services.AddCors(options => options.AddPolicy(name: "_allowSpecificOrigins", policy => policy.WithOrigins("http://localhost:5173")));

  // Add services to the container.
  builder.Services.AddControllers();
  // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
  builder.Services.AddEndpointsApiExplorer();
  builder.Services.AddSwaggerGen();
  builder.Services.AddServices(builder.Configuration);
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

  app.UseCors("_allowSpecificOrigins");

  app.UseHttpsRedirection();

  app.UseAuthorization();

  app.MapControllers();

  app.Run();
}