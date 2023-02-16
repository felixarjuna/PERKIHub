using System;
namespace PERKIHub.Domain.Entities;

public sealed class User
{
  public Guid ID { get; set; } = Guid.NewGuid();
  public string FirstName { get; set; } = null!;
  public string LastName { get; set; } = null!;
  public string Email { get; set; } = null!;
  public string Password { get; set; } = null!;

  private User() { }

  private User(
    string firstName,
    string lastName,
    string email,
    string password,
    Guid? id)
  {
    FirstName = firstName;
    LastName = lastName;
    Email = email;
    Password = password;
    ID = id ?? Guid.NewGuid();
  }

  public static User Create(
    Guid id,
    string firstName,
    string lastName,
    string email,
    string password
  )
  {
    return new User(firstName, lastName, email, password, id);
  }

  public static User Create(
    string firstName,
    string lastName,
    string email,
    string password
  )
  {
    return new User(firstName, lastName, email, password, null);
  }
}