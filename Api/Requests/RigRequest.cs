// RigSync | RigRequest.cs

namespace Api.Requests;

using System.ComponentModel.DataAnnotations;

/// <summary>
/// Create body for a rig.
/// </summary>
public class CreateRigRequest(
  Guid mainCanopyId,
  Guid reserveCanopyId,
  Guid containerId,
  Guid aADId,
  DateOnly? nextReserveRepackDue)
{
  /// <summary>
  /// Gets or sets the ID of the rig's main canopy.
  /// </summary>
  [Required]
  public Guid MainCanopyId { get; set; } = mainCanopyId;

  /// <summary>
  /// Gets or sets the ID of the rig's reserve canopy.
  /// </summary>
  [Required]
  public Guid ReserveCanopyId { get; set; } = reserveCanopyId;

  /// <summary>
  /// Gets or sets the ID of the rig's container.
  /// </summary>
  [Required]
  public Guid ContainerId { get; set; } = containerId;

  /// <summary>
  /// Gets or sets the ID of the rig's AAD.
  /// </summary>
  [Required]
  public Guid AADId { get; set; } = aADId;

  /// <summary>
  /// Gets or sets the date that the reserve repack expires.
  /// </summary>
  public DateOnly? NextReserveRepackDue { get; set; } = nextReserveRepackDue;
}

/// <summary>
/// Update body for a rig.
/// </summary>
public class UpdateRigRequest
{
  /// <summary>
  /// Gets or sets the date that the reserve repack expires.
  /// </summary>
  public DateOnly? NextReserveRepackDue { get; set; }

  /// <summary>
  /// Gets or sets the ID of the rig's main canopy.
  /// </summary>
  public Guid? MainCanopyId { get; set; }

  /// <summary>
  /// Gets or sets the ID of the rig's reserve canopy.
  /// </summary>
  public Guid? ReserveCanopyId { get; set; }

  /// <summary>
  /// Gets or sets the ID of the rig's container.
  /// </summary>
  public Guid? ContainerId { get; set; }

  /// <summary>
  /// Gets or sets the ID of the rig's AAD.
  /// </summary>
  public Guid? AADId { get; set; }
}
