// RigSync | AADRequest.cs

namespace Api.Requests;

using System.ComponentModel.DataAnnotations;

/// <summary>
/// Create body for an AAD.
/// </summary>
public class CreateAADRequest(string manufacturer, string model, DateOnly? nextServiceDue, DateOnly? endOfLife)
{
  /// <summary>
  /// Gets or sets the manufacturer of the AAD.
  /// </summary>
  [Required]
  public string Manufacturer { get; set; } = manufacturer;

  /// <summary>
  /// Gets or sets the model of the AAD.
  /// </summary>
  [Required]
  public string Model { get; set; } = model;

  /// <summary>
  /// Gets or sets the date when the next AAD service is due.
  /// </summary>
  [Required]
  public DateOnly? NextServiceDue { get; set; } = nextServiceDue;

  /// <summary>
  /// Gets or sets the expiry date of the AAD.
  /// </summary>
  [Required]
  public DateOnly? EndOfLife { get; set; } = endOfLife;
}

/// <summary>
/// Update body for an AAD.
/// </summary>
public class UpdateAADRequest
{
  /// <summary>
  /// Gets or sets the manufacturer of the AAD.
  /// </summary>
  public string? Manufacturer { get; set; }

  /// <summary>
  /// Gets or sets the model of the AAD.
  /// </summary>
  public string? Model { get; set; }

  /// <summary>
  /// Gets or sets the date when the next AAD service is due.
  /// </summary>
  public DateOnly? NextServiceDue { get; set; }

  /// <summary>
  /// Gets or sets the expiry date of the AAD.
  /// </summary>
  public DateOnly? EndOfLife { get; set; }
}
