// RigSync | RigBasicResponse.cs

namespace Api.Responses.Shared;

using System.ComponentModel.DataAnnotations;
using Api.Models;

/// <summary>
/// Basic response type for a rig.
/// </summary>
public class RigBasicResponse(Rig rig)
{
  /// <summary>
  /// Gets the ID of the rig.
  /// </summary>
  [Required]
  public Guid Id { get; } = rig.Id;

  /// <summary>
  /// Gets the name of the rig.
  /// </summary>
  [Required]
  public string Name { get; } = rig.Name;
}
