// RigSync | AADResponse.cs

namespace Api.Responses;

using System.ComponentModel.DataAnnotations;
using Api.Models;
using Api.Responses.Shared;

/// <summary>
/// Response type for a single AAD.
/// </summary>
public class AADResponse(AAD aad)
  : KitResponse(aad)
{
  /// <summary>
  /// Gets the ID of the AAD.
  /// </summary>
  [Required]
  public Guid Id { get; private set; } = aad.Id;

  /// <summary>
  /// Gets the next service due date.
  /// </summary>
  [Required]
  public DateOnly? NextServiceDue { get; private set; } = aad.NextServiceDue;

  /// <summary>
  /// Gets the end of life date.
  /// </summary>
  [Required]
  public DateOnly? EndOfLife { get; private set; } = aad.EndOfLife;
}

/// <summary>
/// Response type for multiple AADs.
/// </summary>
public class AADsResponse(IEnumerable<AAD> aads, int page, int limit, int count)
 : PaginatedListResponse<AADResponse>(
    aads.Select(a => new AADResponse(a)),
    page,
    limit,
    count)
{
}
