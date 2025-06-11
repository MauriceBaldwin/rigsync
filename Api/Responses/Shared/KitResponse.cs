// RigSync | KitResponse.cs

namespace Api.Responses.Shared;

using System.ComponentModel.DataAnnotations;
using Api.Models.Shared;

/// <summary>
/// Response type for a single piece of kit.
/// </summary>
public class KitResponse(Kit kit)
{
  /// <summary>
  /// Gets the manufacturer of the piece of kit.
  /// </summary>
  [Required]
  public string Manufacturer { get; private set; } = kit.Manufacturer;

  /// <summary>
  /// Gets the model of the piece of kit.
  /// </summary>
  [Required]
  public string Model { get; private set; } = kit.Model;

  /// <summary>
  /// Gets the description of the piece of kit.
  /// </summary>
  [Required]
  public string? Description { get; private set; } = kit.Description;
}
