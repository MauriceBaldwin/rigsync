// RigSync | Rig.cs

namespace Api.Models;

/// <summary>
/// Represent a rig.
/// </summary>
public class Rig(
  Guid id,
  DateOnly nextReserveRepackDue,
  Guid mainCanopyId,
  Guid reserveCanopyId,
  Guid containerId,
  Guid aADId)
{
  /// <summary>
  /// Gets the rig's id.
  /// </summary>
  public Guid Id { get; private set; } = id;

  /// <summary>
  /// Gets or sets the date that the reserve repack expires.
  /// </summary>
  public DateOnly NextReserveRepackDue { get; set; } = nextReserveRepackDue;

  /// <summary>
  /// Gets or sets the ID of the rig's main canopy.
  /// </summary>
  public Guid MainCanopyId { get; set; } = mainCanopyId;

  /// <summary>
  /// Gets or sets the ID of the rig's reserve canopy.
  /// </summary>
  public Guid ReserveCanopyId { get; set; } = reserveCanopyId;

  /// <summary>
  /// Gets or sets the ID of the rig's container.
  /// </summary>
  public Guid ContainerId { get; set; } = containerId;

  /// <summary>
  /// Gets or sets the ID of the rig's AAD.
  /// </summary>
  public Guid AADId { get; set; } = aADId;

  /// <summary>
  /// Gets the main canopy.
  /// </summary>
  public MainCanopy MainCanopy { get; } = null!;

  /// <summary>
  /// Gets or sets the reserve canopy.
  /// </summary>
  public ReserveCanopy ReserveCanopy { get; set; } = null!;

  /// <summary>
  /// Gets or sets the container.
  /// </summary>
  public Container Container { get; set; } = null!;

  /// <summary>
  /// Gets or sets the AAD.
  /// </summary>
  public AAD AAD { get; set; } = null!;
}