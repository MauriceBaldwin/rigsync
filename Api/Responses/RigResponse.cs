// RigSync | RigResponse.cs

namespace Api.Responses;

using System.ComponentModel.DataAnnotations;
using Api.Models;
using Api.Responses.Shared;

/// <summary>
/// Response type for a single rig.
/// </summary>
public class RigResponse(Rig rig)
  : RigBasicResponse(rig)
{
  /// <summary>
  /// Gets the date that the reserve repack expires.
  /// </summary>
  public DateResponse? NextReserveRepackDue { get; } =
    rig.NextReserveRepackDue.HasValue
      ? new DateResponse(rig.NextReserveRepackDue.Value)
      : null;

  /// <summary>
  /// Gets the rig's main canopy.
  /// </summary>
  [Required]
  public MainCanopyResponse MainCanopy { get; } = new MainCanopyResponse(rig.MainCanopy);

  /// <summary>
  /// Gets the rig's reserve canopy.
  /// </summary>
  [Required]
  public ReserveCanopyResponse ReserveCanopy { get; } = new ReserveCanopyResponse(rig.ReserveCanopy);

  /// <summary>
  /// Gets the rig's container.
  /// </summary>
  [Required]
  public ContainerResponse Container { get; } = new ContainerResponse(rig.Container);

  /// <summary>
  /// Gets the rig's AAD.
  /// </summary>
  [Required]
  public AADResponse AAD { get; } = new AADResponse(rig.AAD);
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
