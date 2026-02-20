// RigSync | Container.cs

namespace Api.Domains;

using Api.Domains.Exceptions;
using Api.Models;
using Api.Requests;
using Microsoft.EntityFrameworkCore;

/// <summary>
/// Provides domain logic to be consumed by the Container functions.
/// </summary>
public static class Container
{
  /// <summary>
  /// Count all containers.
  /// </summary>
  /// <returns>The count of all containers.</returns>
  public static async Task<int> CountAsync()
  {
    using var context = new Context();
    return await context.Containers.CountAsync();
  }

  /// <summary>
  /// Retrieve a paginated list of containers.
  /// </summary>
  /// <param name="page">The page number for pagination.</param>
  /// <param name="limit">The limit of items per page for pagination.</param>
  /// <returns>A list of containers.</returns>
  public static async Task<List<Models.Container>> ListAsync(int page, int limit)
  {
    using var context = new Context();
    return await context.Containers
      .Skip((page - 1) * limit)
      .Take(limit)
      .ToListAsync();
  }

  /// <summary>
  /// Retrieve a single container using its ID.
  /// </summary>
  /// <param name="id">The ID of the container to retrieve.</param>
  /// <returns>The container with the given ID.</returns>
  public static async Task<Models.Container> GetAsync(Guid id)
  {
    using var context = new Context();
    return await context.Containers.SingleOrDefaultAsync(c => c.Id == id) ??
      throw new NotFoundByIdException($"Container with id = \"{id}\" does not exist");
  }

  /// <summary>
  /// Creates a container in the db.
  /// </summary>
  /// <param name="toCreate">The container to be created.</param>
  /// <param name="user">The owner of the container to be created.</param>
  /// <returns>The newly created container.</returns>
  public static async Task<Models.Container> CreateAsync(CreateContainerRequest toCreate, AuthProfile user)
  {
    using var context = new Context();
    var container = new Models.Container(toCreate, user);

    await context.Containers.AddAsync(container);
    await context.SaveChangesAsync();

    return container;
  }

  /// <summary>
  /// Updates a container in the db.
  /// </summary>
  /// <param name="id">The ID of the container to update.</param>
  /// <param name="toUpdate">The container info to be updated.</param>
  /// <returns>The updated container.</returns>
  public static async Task<Models.Container> UpdateAsync(Guid id, UpdateContainerRequest toUpdate)
  {
    using var context = new Context();
    var container = await context.Containers.SingleOrDefaultAsync(c => c.Id == id) ??
      throw new NotFoundByIdException($"Container with id = \"{id}\" does not exist");

    if (toUpdate.Manufacturer != null)
    {
      container.Manufacturer = toUpdate.Manufacturer;
    }

    if (toUpdate.Model != null)
    {
      container.Model = toUpdate.Model;
    }

    await context.SaveChangesAsync();

    return container;
  }

  /// <summary>
  /// Deletes a container from the db using its ID.
  /// </summary>
  /// <param name="id">The ID of the container to delete.</param>
  /// <returns>Nothing.</returns>
  public static async Task DeleteAsync(Guid id)
  {
    using var context = new Context();
    var container = await context.Containers.SingleOrDefaultAsync(c => c.Id == id) ??
      throw new NotFoundByIdException($"Container with id = \"{id}\" does not exist");
    context.Containers.Remove(container);
    await context.SaveChangesAsync();
  }
}
