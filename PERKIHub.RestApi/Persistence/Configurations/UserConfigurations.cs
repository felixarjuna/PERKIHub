using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PERKIHub.Domain.Entities;

namespace PERKIHub.RestApi.Persistence.Configurations;

public class UserConfigurations : IEntityTypeConfiguration<User>
{
  public void Configure(EntityTypeBuilder<User> builder)
  {
    builder.HasKey(u => u.ID);
    builder
      .Property(u => u.FirstName)
      .HasMaxLength(50);
    builder
      .Property(u => u.LastName)
      .HasMaxLength(50);
    builder
      .Property(u => u.Email)
      .HasMaxLength(100);
    builder
      .Property(u => u.Password)
      .HasMaxLength(100);
  }
}