// RigSync | MainCanopyResponse.cs

namespace Api.Responses;

using Api.Models;
using Api.Responses.Shared;

/// <summary>
/// Response type for a single main canopy.
/// </summary>
public class MainCanopyResponse(MainCanopy mainCanopy)
  : CanopyResponse(mainCanopy)
{
  /// <summary>
  /// Gets the ID of the main canopy.
  /// </summary>
  public Guid Id { get; private set; } = mainCanopy.Id;
}

/// <summary>
/// Response type for multiple main canopies.
/// </summary>
public class MainCanopiesResponse(IEnumerable<MainCanopy> mainCanopies)
{
  /// <summary>
  /// Gets an array of main canopies.
  /// </summary>
  public IEnumerable<MainCanopyResponse> MainCanopies { get; private set; } =
    mainCanopies.Select(u => new MainCanopyResponse(u));
}
