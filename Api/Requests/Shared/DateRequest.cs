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

  /// <summary>
  /// Converts this <see cref="DateRequest"/> to a <see cref="DateOnly"/>.
  /// </summary>
  /// <returns>Corresponding <see cref="DateOnly"/> instance.</returns>
  public DateOnly ToDateOnly()
  {
    return new DateOnly(this.Year, this.Month, this.Day);
  }
}
