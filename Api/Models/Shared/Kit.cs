// RigSync | Kit.cs

namespace Api.Models.Shared;

/// <summary>
/// Represents a generic piece of kit.
/// </summary>
public class Kit(string manufacturer, string model)
{
  /// <summary>
  /// Gets or sets the manufacturer of the piece of kit.
  /// </summary>
  public string Manufacturer { get; set; } = manufacturer;

  /// <summary>
  /// Gets or sets the model of the piece of kit.
  /// </summary>
  public string Model { get; set; } = model;

  /// <summary>
  /// Gets or sets the description of the piece of kit.
  /// </summary>
  public string? Description { get; set; }
}