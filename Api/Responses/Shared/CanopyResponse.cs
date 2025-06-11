// RigSync | CanopyResponse.cs

namespace Api.Responses.Shared;

using System.ComponentModel.DataAnnotations;
using Api.Models.Shared;

/// <summary>
/// Response type for a single canopy.
/// </summary>
public class CanopyResponse(Canopy canopy)
  : KitResponse(canopy)
{
  /// <summary>
  /// Gets the size of the canopy in square feet.
  /// </summary>
  [Required]
  public int Size { get; private set; } = canopy.Size;
}
