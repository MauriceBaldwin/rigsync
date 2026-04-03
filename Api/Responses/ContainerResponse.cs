// RigSync | ContainerResponse.cs

namespace Api.Responses;

using System.ComponentModel.DataAnnotations;
using Api.Models;
using Api.Responses.Shared;

/// <summary>
/// Response type for a single container.
/// </summary>
public class ContainerResponse(Container container)
  : KitResponse(container)
{
  /// <summary>
  /// Gets the ID of the container.
  /// </summary>
  [Required]
  public Guid Id { get; } = container.Id;

  /// <summary>
  /// Gets the rig that this container is part of.
  /// </summary>
  public RigBasicResponse? Rig { get; } = container.Rig != null
    ? new RigBasicResponse(container.Rig)
    : null;
}

/// <summary>
/// Response type for multiple containers.
/// </summary>
public class ContainersResponse(IEnumerable<Container> containers, int page, int limit, int count)
 : PaginatedListResponse<ContainerResponse>(
    containers.Select(c => new ContainerResponse(c)),
    page,
    limit,
    count)
{
}
