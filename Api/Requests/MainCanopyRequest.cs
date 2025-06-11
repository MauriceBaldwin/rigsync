// RigSync | MainCanopyRequest.cs

namespace Api.Requests;

using System.ComponentModel.DataAnnotations;

/// <summary>
/// Create body for a main canopy.
/// </summary>
public class CreateMainCanopyRequest(string manufacturer, string model, int size)
{
  /// <summary>
  /// Gets or sets the manufacturer of the canopy.
  /// </summary>
  [Required]
  public string Manufacturer { get; set; } = manufacturer;

  /// <summary>
  /// Gets or sets the model of the canopy.
  /// </summary>
  [Required]
  public string Model { get; set; } = model;

  /// <summary>
  /// Gets or sets the size of the canopy in square feet.
  /// </summary>
  [Required]
  public int Size { get; set; } = size;
}

/// <summary>
/// Update body for a main canopy.
/// </summary>
public class UpdateMainCanopyRequest
{
  /// <summary>
  /// Gets or sets the manufacturer of the canopy.
  /// </summary>
  public string? Manufacturer { get; set; }

  /// <summary>
  /// Gets or sets the model of the canopy.
  /// </summary>
  public string? Model { get; set; }

  /// <summary>
  /// Gets or sets the size of the canopy in square feet.
  /// </summary>
  public int? Size { get; set; }
}