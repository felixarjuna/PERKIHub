using Microsoft.EntityFrameworkCore;
using PERKIHub.Domain.Entities;

namespace PERKIHub.RestApi.Persistence;

public class PerkiHubDbContext : DbContext
{
  public PerkiHubDbContext(DbContextOptions<PerkiHubDbContext> options)
    : base(options)
  {
  }

  public DbSet<User> PH_UserDef { get; set; } = null!;
  public DbSet<Event> PH_EventDef { get; set; } = null!;

  protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
  {
    IConfiguration configuration = new ConfigurationBuilder()
      .SetBasePath(Directory.GetCurrentDirectory())
      .AddJsonFile("appsettings.json")
      .Build();

    optionsBuilder.UseSqlServer(configuration.GetConnectionString("PerkiHubDbContext"));
  }

  protected override void OnModelCreating(ModelBuilder builder)
  {
    builder.ApplyConfigurationsFromAssembly(typeof(PerkiHubDbContext).Assembly);
  }
}