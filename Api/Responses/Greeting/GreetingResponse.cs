// RigSync | GreetingResponse.cs

namespace Api.Responses.Greeting;

/// <summary>
/// Response type for a greeting.
/// </summary>
/// <param name="greeting">A greeting.</param>
public class GreetingResponse(string greeting)
{
  /// <summary>
  /// Gets: A greeting.
  /// </summary>
  public string Greeting { get; private set; } = greeting;
}