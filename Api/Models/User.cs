// RigSync | User.cs

namespace Api.Models;

/// <summary>
/// Represent a user.
/// </summary>
public class User
{
  /// <summary>
  /// Initializes a new instance of the <see cref="User"/> class.
  /// </summary>
  /// <param name="id">User's id.</param>
  /// <param name="name">User's name.</param>
  public User(int id, string name)
  {
    this.Id = id;
    this.Name = name;
  }

  /// <summary>
  /// Gets or sets the user's id.
  /// </summary>
  public int Id { get; set; }

  /// <summary>
  /// Gets or sets the user's name.
  /// </summary>
  public string Name { get; set; }
}