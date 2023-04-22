using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;

namespace PERKIHub.Domain.Entities;

public sealed class ProfilePicture
{
  public Guid ID { get; set; } = Guid.NewGuid();
  [ForeignKey("UserID")]
  public User User { get; set; } = null!;
  public Guid UserID { get; set; }
  public string ContentType { get; set; } = null!;
  public byte[]? File { get; set; }

  public ProfilePicture() { }

  public ProfilePicture(Guid userID, string contentType, byte[] file)
  {
    UserID = userID;
    ContentType = contentType;
    File = file;
    ID = Guid.NewGuid();
  }

  public static ProfilePicture Create(Guid userID, string contentType, byte[] file)
  {
    return new ProfilePicture(userID, contentType, file);
  }
}