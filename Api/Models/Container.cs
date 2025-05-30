// RigSync | Container.cs

namespace Api.Models;

using Api.Models.Shared;

/// <summary>
/// Initializes a new instance of the <see cref="Container"/> class.
/// </summary>
public class Container(Guid id, string manufacturer, string model)
  : Kit(manufacturer, model)
{
  /// <summary>
  /// Gets the container's id.
  /// </summary>
  public Guid Id { get; private set; } = id;

  /// <summary>
  /// Gets or sets the rig that the container is part of.
  /// </summary>
  public Rig? Rig { get; set; }
}