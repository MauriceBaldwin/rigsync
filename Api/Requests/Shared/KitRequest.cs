// RigSync | KitRequest.cs

namespace Api.Requests.Shared;

using System.ComponentModel.DataAnnotations;

/// <summary>
/// Create body for a piece of kit.
/// </summary>
public class CreateKitRequest
{
  /// <summary>
  /// Gets the manufacturer of the kit.
  /// </summary>
  [Required]
  public string Manufacturer { init; get; } = string.Empty;

  /// <summary>
  /// Gets the model of the kit.
  /// </summary>
  [Required]
  public string Model { init; get; } = string.Empty;

  /// <summary>
  /// Gets the kit description.
  /// </summary>
  public string? Description { init; get; }
}

/// <summary>
/// Update body for a piece of kit.
/// </summary>
public class UpdateKitRequest
{
  /// <summary>
  /// Gets the manufacturer of the kit.
  /// </summary>
  public string? Manufacturer { init; get; }

  /// <summary>
  /// Gets the model of the kit.
  /// </summary>
  public string? Model { init; get; }

  /// <summary>
  /// Gets the kit description.
  /// </summary>
  public string? Description { init; get; }
}
