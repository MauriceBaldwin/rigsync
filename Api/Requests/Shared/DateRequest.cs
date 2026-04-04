// RigSync | DateRequest.cs

namespace Api.Requests.Shared;

using System.ComponentModel.DataAnnotations;

/// <summary>
/// Request type for a date.
/// </summary>
public class DateRequest
{
  /// <summary>
  /// Gets the year of the date.
  /// </summary>
  [Required]
  [Range(1, 9999, ErrorMessage = "Year must be between 1 and 9999.")]
  public int Year { get; init; }

  /// <summary>
  /// Gets the month of the date.
  /// </summary>
  [Required]
  [Range(1, 12, ErrorMessage = "Month must be between 1 and 12.")]
  public int Month { get; init; }

  /// <summary>
  /// Gets the day of the date.
  /// </summary>
  [Required]
  [Range(1, 31, ErrorMessage = "Day must be between 1 and 31.")]
  public int Day { get; init; }

  /// <summary>
  /// Converts this <see cref="DateRequest"/> to a <see cref="DateOnly"/>.
  /// </summary>
  /// <returns>Corresponding <see cref="DateOnly"/> instance.</returns>
  public DateOnly ToDateOnly()
  {
    return new DateOnly(this.Year, this.Month, this.Day);
  }
}
