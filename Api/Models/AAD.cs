// RigSync | AAD.cs

namespace Api.Models;

using Api.Models.Shared;

/// <summary>
/// Initializes a new instance of the <see cref="AAD"/> class.
/// </summary>
public class AAD(Guid id, string manufacturer, string model, DateOnly nextServiceDue, DateOnly endOfLife)
  : Kit(manufacturer, model)
{
  /// <summary>
  /// Gets the main canopy's id.
  /// </summary>
  public Guid Id { get; private set; } = id;

  /// <summary>
  /// Gets or sets the date when the next AAD service is due.
  /// </summary>
  public DateOnly NextServiceDue { get; set; } = nextServiceDue;

  /// <summary>
  /// Gets or sets the expiry date of the AAD.
  /// </summary>
  public DateOnly EndOfLife { get; set; } = endOfLife;

  /// <summary>
  /// Gets or sets the rig that the AAD is part of.
  /// </summary>
  public Rig? Rig { get; set; }
}