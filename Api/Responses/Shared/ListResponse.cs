// RigSync | ListResponse.cs

namespace Api.Responses.Shared;

using System.ComponentModel.DataAnnotations;

/// <summary>
/// Response type for listing multiple resources.
/// </summary>
/// <typeparam name="T">The resource type that is being listed.</typeparam>
public class ListResponse<T>
{
  /// <summary>
  /// Initializes a new instance of the <see cref="ListResponse{T}"/> class.
  /// </summary>
  /// <param name="items">The list of resources.</param>
  /// <param name="count">The total count of resources that exist.</param>
  public ListResponse(IEnumerable<T> items, int count)
  {
    this.Items = items;
    this.Count = count;
  }

  /// <summary>
  /// Initializes a new instance of the <see cref="ListResponse{T}"/> class.
  /// </summary>
  /// <param name="items">The list of resources.</param>
  public ListResponse(IEnumerable<T> items)
  {
    this.Items = items;
    this.Count = items.Count();
  }

  /// <summary>
  /// Gets or sets the list of resources.
  /// </summary>
  [Required]
  public IEnumerable<T> Items { get; protected set; }

  /// <summary>
  /// Gets or sets the total count of resources.
  /// </summary>
  [Required]
  public int Count { get; protected set; }
}
