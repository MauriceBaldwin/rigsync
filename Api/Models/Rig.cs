// RigSync | Rig.cs

namespace Api.Models;

using Api.Requests;

/// <summary>
/// Represent a rig.
/// </summary>
public class Rig(
  Guid id,
  DateOnly? nextReserveRepackDue,
  Guid mainCanopyId,
  Guid reserveCanopyId,
  Guid containerId,
  Guid aADId,
  string ownerId)
{
  /// <summary>
  /// Initializes a new instance of the <see cref="Rig"/> class.
  /// </summary>
  /// <param name="createRequest">The HTTP request body to create a new rig.</param>
  /// <param name="owner">The owner of this rig.</param>
  public Rig(CreateRigRequest createRequest, AuthProfile owner)
    : this(
      Guid.NewGuid(),
      createRequest.NextReserveRepackDue,
      createRequest.MainCanopyId,
      createRequest.ReserveCanopyId,
      createRequest.ContainerId,
      createRequest.AADId,
      owner.Id)
  {
  }

  /// <summary>
  /// Gets the rig's id.
  /// </summary>
  public Guid Id { get; private set; } = id;

  /// <summary>
  /// Gets or sets the date that the reserve repack expires.
  /// </summary>
  public DateOnly? NextReserveRepackDue { get; set; } = nextReserveRepackDue;

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
  /// Gets the rig's owner ID.
  /// </summary>
  public string OwnerId { get; private set; } = ownerId;

  /// <summary>
  /// Gets or sets the main canopy.
  /// </summary>
  public MainCanopy MainCanopy { get; set; } = null!;

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