// RigSync | UsersResponse.cs

namespace Api.Responses.Users;

/// <summary>
/// Response type for a single user.
/// </summary>
/// <param name="user">The user retrieved from the db.</param>
public class UserResponse(Models.User user)
{
  /// <summary>
  /// Gets the user's Id.
  /// </summary>
  public int Id { get; private set; } = user.Id;

  /// <summary>
  /// Gets the user's name.
  /// </summary>
  public string Name { get; private set; } = user.Name;
}

/// <summary>
/// Response type for listing all users.
/// </summary>
/// <param name="users">The users retrieved from the db.</param>
public class UsersResponse(IEnumerable<Models.User> users)
{
  /// <summary>
  /// Gets an array of users.
  /// </summary>
  public IEnumerable<UserResponse> Users { get; private set; } = users.Select(u => new UserResponse(u));
}