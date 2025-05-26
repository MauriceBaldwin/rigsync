// RigSync | Greeting.cs

namespace Api.Domains;

/// <summary>
/// Provides domain logic to be consumed by the Greeting function.
/// </summary>
public static class Greeting
{
  /// <summary>
  /// Generate a personalised greeting.
  /// </summary>
  /// <param name="name">Name of the person to be greeted.</param>
  /// <returns>A personalised greeting.</returns>
  public static string GenerateGreeting(string? name)
  {
    if (string.IsNullOrEmpty(name))
    {
      return "Hello, please tell me your name.";
    }

    return $"Hello, {name}. Nice to meet you!";
  }
}