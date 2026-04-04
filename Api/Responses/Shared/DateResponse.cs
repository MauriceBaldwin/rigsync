// RigSync | DateResponse.cs

namespace Api.Responses.Shared;

using System.ComponentModel.DataAnnotations;

/// <summary>
/// Response type for a date.
/// </summary>
public record DateResponse
{
  /// <summary>
  /// Initializes a new instance of the <see cref="DateResponse"/> class.
  /// </summary>
  /// <param name="date">The date.</param>
  public DateResponse(DateOnly date)
  {
    this.Year = date.Year;
    this.Month = date.Month;
    this.Day = date.Day;
  }

  /// <summary>
  /// Gets the year of the date.
  /// </summary>
  [Required]
  [Range(1, 9999)]
  public int Year { get; init; }

  /// <summary>
  /// Gets the month of the date.
  /// </summary>
  [Required]
  [Range(1, 12)]
  public int Month { get; init; }

  /// <summary>
  /// Gets the day of the date.
  /// </summary>
  [Required]
  [Range(1, 31)]
  public int Day { get; init; }
}
