// RigSync | RigRequest.cs

namespace Api.Requests;

using System.ComponentModel.DataAnnotations;

/// <summary>
/// Create body for a rig.
/// </summary>
public class CreateRigRequest
{
  /// <summary>
  /// Gets the name of the rig.
  /// </summary>
  [Required]
  public string Name { init; get; } = string.Empty;

  /// <summary>
  /// Gets the ID of the rig's main canopy.
  /// </summary>
  [Required]
  public Guid MainCanopyId { init; get; }

  /// <summary>
  /// Gets the ID of the rig's reserve canopy.
  /// </summary>
  [Required]
  public Guid ReserveCanopyId { init; get; }

  /// <summary>
  /// Gets the ID of the rig's container.
  /// </summary>
  [Required]
  public Guid ContainerId { init; get; }

  /// <summary>
  /// Gets the ID of the rig's AAD.
  /// </summary>
  [Required]
  public Guid AADId { init; get; }

  /// <summary>
  /// Gets the date that the reserve repack expires.
  /// </summary>
  public DateOnly? NextReserveRepackDue { init; get; }
}

/// <summary>
/// Update body for a rig.
/// </summary>
public class UpdateRigRequest
{
  /// <summary>
  /// Gets the name of the rig.
  /// </summary>
  public string? Name { init; get; }

  /// <summary>
  /// Gets the date that the reserve repack expires.
  /// </summary>
  public DateOnly? NextReserveRepackDue { init; get; }

  /// <summary>
  /// Gets the ID of the rig's main canopy.
  /// </summary>
  public Guid? MainCanopyId { init; get; }

  /// <summary>
  /// Gets the ID of the rig's reserve canopy.
  /// </summary>
  public Guid? ReserveCanopyId { init; get; }

  /// <summary>
  /// Gets the ID of the rig's container.
  /// </summary>
  public Guid? ContainerId { init; get; }

  /// <summary>
  /// Gets the ID of the rig's AAD.
  /// </summary>
  public Guid? AADId { init; get; }
}
