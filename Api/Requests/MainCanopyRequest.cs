// RigSync | MainCanopyRequest.cs

namespace Api.Requests;

/// <summary>
/// Create body for a main canopy.
/// </summary>
public class CreateMainCanopyRequest
{
  /// <summary>
  /// Gets or sets the manufacturer of the canopy.
  /// </summary>
  required public string Manufacturer { get; set; }

  /// <summary>
  /// Gets or sets the model of the canopy.
  /// </summary>
  required public string Model { get; set; }

  /// <summary>
  /// Gets or sets the size of the canopy in square feet.
  /// </summary>
  required public int Size { get; set; }
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