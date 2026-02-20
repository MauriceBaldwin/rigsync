// RigSync | Canopy.cs

namespace Api.Models.Shared;

/// <summary>
/// Represents a generic canopy, regardless of it being a main or reserve.
/// </summary>
public class Canopy(string manufacturer, string model, int size, string ownerId)
  : Kit(manufacturer, model, ownerId)
{
  /// <summary>
  /// Gets or sets the size of the canopy, in square feet.
  /// </summary>
  public int Size { get; set; } = size;
}