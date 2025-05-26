// RigSync | Person.cs

namespace Api.Requests.Greeting;

/// <summary>
/// Information about a person.
/// </summary>
public class Person
{
  /// <summary>
  /// Gets or sets the person's name.
  /// </summary>
  required public string Name { get; set; }
}