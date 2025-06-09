// RigSync | CreateRequest.cs

namespace Api.Requests.MainCanopy;

/// <summary>
/// Create body for a main canopy.
/// </summary>
public class CreateRequest
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