// RigSync | RigResponse.cs

namespace Api.Responses;

using System.ComponentModel.DataAnnotations;
using Api.Models;
using Api.Responses.Shared;

/// <summary>
/// Response type for a single rig.
/// </summary>
public class RigResponse(Rig rig)
{
  /// <summary>
  /// Gets the ID of the rig.
  /// </summary>
  [Required]
  public Guid Id { get; private set; } = rig.Id;

  /// <summary>
  /// Gets the date that the reserve repack expires.
  /// </summary>
  public DateOnly? NextReserveRepackDue { get; private set; } = rig.NextReserveRepackDue;

  /// <summary>
  /// Gets the rig's main canopy.
  /// </summary>
  [Required]
  public MainCanopyResponse MainCanopy { get; private set; } = new MainCanopyResponse(rig.MainCanopy);

  /// <summary>
  /// Gets the rig's reserve canopy.
  /// </summary>
  [Required]
  public ReserveCanopyResponse ReserveCanopy { get; private set; } = new ReserveCanopyResponse(rig.ReserveCanopy);

  /// <summary>
  /// Gets the rig's container.
  /// </summary>
  [Required]
  public ContainerResponse Container { get; private set; } = new ContainerResponse(rig.Container);

  /// <summary>
  /// Gets the rig's AAD.
  /// </summary>
  [Required]
  public AADResponse AAD { get; private set; } = new AADResponse(rig.AAD);

  /// <summary>
  /// Gets the ID of the rig's owner.
  /// </summary>
  [Required]
  public string OwnerId { get; private set; } = rig.OwnerId;
}

/// <summary>
/// Response type for multiple rigs.
/// </summary>
public class RigsResponse(IEnumerable<Rig> rigs, int page, int limit, int count)
  : PaginatedListResponse<RigResponse>(
    rigs.Select(r => new RigResponse(r)),
    page,
    limit,
    count)
{
}
