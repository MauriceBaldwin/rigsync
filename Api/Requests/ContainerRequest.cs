// RigSync | ContainerRequest.cs

namespace Api.Requests;

using System.ComponentModel.DataAnnotations;

/// <summary>
/// Create body for a container.
/// </summary>
public class CreateContainerRequest(string manufacturer, string model)
{
  /// <summary>
  /// Gets or sets the manufacturer of the container.
  /// </summary>
  [Required]
  public string Manufacturer { get; set; } = manufacturer;

  /// <summary>
  /// Gets or sets the model of the container.
  /// </summary>
  [Required]
  public string Model { get; set; } = model;
}

/// <summary>
/// Update body for a container.
/// </summary>
public class UpdateContainerRequest
{
  /// <summary>
  /// Gets or sets the manufacturer of the container.
  /// </summary>
  public string? Manufacturer { get; set; }

  /// <summary>
  /// Gets or sets the model of the container.
  /// </summary>
  public string? Model { get; set; }
}
