// RigSync | ReserveCanopyResponse.cs

namespace Api.Responses;

using System.ComponentModel.DataAnnotations;
using Api.Models;
using Api.Responses.Shared;

/// <summary>
/// Response type for a single reserve canopy.
/// </summary>
public class ReserveCanopyResponse(ReserveCanopy reserveCanopy)
  : CanopyResponse(reserveCanopy)
{
  /// <summary>
  /// Gets the ID of the reserve canopy.
  /// </summary>
  [Required]
  public Guid Id { get; private set; } = reserveCanopy.Id;
}

/// <summary>
/// Response type for multiple reserve canopies.
/// </summary>
public class ReserveCanopiesResponse(IEnumerable<ReserveCanopy> reserveCanopies, int page, int limit, int count)
 : PaginatedListResponse<ReserveCanopyResponse>(
    reserveCanopies.Select(r => new ReserveCanopyResponse(r)),
    page,
    limit,
    count)
{
}
