// RigSync | PaginatedListResponse.cs

namespace Api.Responses.Shared;

using System.ComponentModel.DataAnnotations;

/// <summary>
/// Response type for listing multiple resources, with pagination applied.
/// </summary>
/// <typeparam name="T">The type of the resource being listed.</typeparam>
/// <param name="items">The resources being listed.</param>
/// <param name="page">The page number of the pagination.</param>
/// <param name="limit">The number of resources per page of the pagination.</param>
/// <param name="count">The total number of resources.</param>
public class PaginatedListResponse<T>(IEnumerable<T> items, int page, int limit, int count)
  : ListResponse<T>(items, count)
{
  /// <summary>
  /// Gets the page number of the pagination.
  /// </summary>
  [Required]
  public int Page { get; private set; } = page;

  /// <summary>
  /// Gets the number of resources per page of the pagination.
  /// </summary>
  [Required]
  public int Limit { get; private set; } = limit;
}