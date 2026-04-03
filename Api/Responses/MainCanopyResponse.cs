// RigSync | MainCanopyResponse.cs

namespace Api.Responses;

using System.ComponentModel.DataAnnotations;
using Api.Models;
using Api.Responses.Shared;

/// <summary>
/// Response type for a single main canopy.
/// </summary>
public class MainCanopyResponse(MainCanopy mainCanopy)
  : CanopyResponse(mainCanopy)
{
  /// <summary>
  /// Gets the ID of the main canopy.
  /// </summary>
  [Required]
  public Guid Id { get; } = mainCanopy.Id;

  /// <summary>
  /// Gets the rig that this main canopy is in.
  /// </summary>
  public RigBasicResponse? Rig { get; } = mainCanopy.Rig != null
    ? new RigBasicResponse(mainCanopy.Rig)
    : null;
}

/// <summary>
/// Response type for multiple main canopies.
/// </summary>
public class MainCanopiesResponse(IEnumerable<MainCanopy> mainCanopies, int page, int limit, int count)
 : PaginatedListResponse<MainCanopyResponse>(
    mainCanopies.Select(m => new MainCanopyResponse(m)),
    page,
    limit,
    count)
{
}
