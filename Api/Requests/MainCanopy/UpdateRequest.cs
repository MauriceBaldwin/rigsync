// RigSync | UpdateRequest.cs

namespace Api.Requests.MainCanopy;

/// <summary>
/// Update body for a main canopy.
/// </summary>
public class UpdateRequest
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