// RigSync | MainCanopy.cs

namespace Api.Models;

using Api.Models.Shared;

/// <summary>
/// Initializes a new instance of the <see cref="MainCanopy"/> class.
/// </summary>
public class MainCanopy(Guid id, string manufacturer, string model, int size)
  : Canopy(manufacturer, model, size)
{
  /// <summary>
  /// Gets the main canopy's id.
  /// </summary>
  public Guid Id { get; private set; } = id;

  /// <summary>
  /// Gets or sets the rig that the main canopy is part of.
  /// </summary>
  public Rig? Rig { get; set; }
}