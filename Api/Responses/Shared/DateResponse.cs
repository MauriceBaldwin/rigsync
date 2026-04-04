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
  public int Year { get; init; }

  /// <summary>
  /// Gets the month of the date.
  /// </summary>
  [Required]
  public int Month { get; init; }

  /// <summary>
  /// Gets the day of the date.
  /// </summary>
  [Required]
  public int Day { get; init; }
}
