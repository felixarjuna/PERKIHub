using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PERKIHub.Domain.Entities;

namespace PERKIHub.RestApi.Persistence.Configurations;

public class EventConfigurations : IEntityTypeConfiguration<Event>
{
  public void Configure(EntityTypeBuilder<Event> builder)
  {
    builder.HasKey(e => e.ID);
    builder
      .Property(e => e.Title)
      .HasMaxLength(50);
    builder
      .Property(e => e.Date)
      .HasMaxLength(50);
    builder
      .Property(e => e.Speaker)
      .HasMaxLength(100);
    builder
      .Property(e => e.Topic)
      .HasMaxLength(100);

    builder
      .Property(e => e.Participants)
      .HasConversion(
        v => string.Join(',', v),
        v => v.Split(',', StringSplitOptions.RemoveEmptyEntries).ToList());
  }
}