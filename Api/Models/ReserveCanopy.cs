// RigSync | ReserveCanopy.cs

namespace Api.Models;

using Api.Models.Shared;

/// <summary>
/// Initializes a new instance of the <see cref="ReserveCanopy"/> class.
/// </summary>
public class ReserveCanopy(Guid id, string manufacturer, string model, int size)
  : Canopy(manufacturer, model, size)
{
  /// <summary>
  /// Gets the reserve canopy's id.
  /// </summary>
  public Guid Id { get; private set; } = id;

  /// <summary>
  /// Gets or sets the rig that the reserve canopy is part of.
  /// </summary>
  public Rig? Rig { get; set; }
}