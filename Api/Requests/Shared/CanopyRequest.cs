// RigSync | CanopyRequest.cs

namespace Api.Requests.Shared;

using System.ComponentModel.DataAnnotations;

/// <summary>
/// Create body for a canopy.
/// </summary>
public class CreateCanopyRequest : CreateKitRequest
{
  /// <summary>
  /// Gets the size of the canopy in square feet.
  /// </summary>
  [Required]
  public int Size { init; get; }
}

/// <summary>
/// Update body for a canopy.
/// </summary>
public class UpdateCanopyRequest : UpdateKitRequest
{
  /// <summary>
  /// Gets the size of the canopy in square feet.
  /// </summary>
  public int? Size { init; get; }
}
