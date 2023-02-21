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

  protected override void OnModelCreating(ModelBuilder builder)
  {
    builder.ApplyConfigurationsFromAssembly(typeof(PerkiHubDbContext).Assembly);
  }
}