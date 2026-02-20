// RigSync | MainCanopy.cs

namespace Api.Domains;

using Api.Domains.Exceptions;
using Api.Models;
using Api.Requests;
using Microsoft.EntityFrameworkCore;

/// <summary>
/// Provides domain logic to be consumed by the MainCanopy functions.
/// </summary>
public static class MainCanopy
{
  /// <summary>
  /// Count all main canopies.
  /// </summary>
  /// <returns>The count of all main canopies.</returns>
  public static async Task<int> CountAsync()
  {
    using var context = new Context();
    return await context.MainCanopies.CountAsync();
  }

  /// <summary>
  /// Retrieve a paginated list of main canopies.
  /// </summary>
  /// <param name="page">The page number for pagination.</param>
  /// <param name="limit">The limit of items per page for pagination.</param>
  /// <returns>A list of main canopies.</returns>
  public static async Task<List<Models.MainCanopy>> ListAsync(int page, int limit)
  {
    using var context = new Context();
    return await context.MainCanopies
      .Skip((page - 1) * limit)
      .Take(limit)
      .ToListAsync();
  }

  /// <summary>
  /// Retrieve a single main canopy using its ID.
  /// </summary>
  /// <param name="id">The ID of the main canopy to retrieve.</param>
  /// <returns>The main canopy with the given ID.</returns>
  public static async Task<Models.MainCanopy> GetAsync(Guid id)
  {
    using var context = new Context();
    return await context.MainCanopies.SingleOrDefaultAsync(m => m.Id == id) ??
      throw new NotFoundByIdException($"Main canopy with id = \"{id}\" does not exist");
  }

  /// <summary>
  /// Creates a main canopy in the db.
  /// </summary>
  /// <param name="toCreate">The main canopy to be created.</param>
  /// <param name="user">The owner of the main canopy to be created.</param>
  /// <returns>The newly created main canopy.</returns>
  public static async Task<Models.MainCanopy> CreateAsync(CreateMainCanopyRequest toCreate, AuthProfile user)
  {
    using var context = new Context();
    var mainCanopy = new Models.MainCanopy(toCreate, user);

    await context.MainCanopies.AddAsync(mainCanopy);
    await context.SaveChangesAsync();

    return mainCanopy;
  }

  /// <summary>
  /// Updates a main canopy in the db.
  /// </summary>
  /// <param name="id">The ID of the main canopy to update.</param>
  /// <param name="toUpdate">The main canopy info to be updated.</param>
  /// <returns>The updated main canopy.</returns>
  public static async Task<Models.MainCanopy> UpdateAsync(Guid id, UpdateMainCanopyRequest toUpdate)
  {
    using var context = new Context();
    var mainCanopy = await context.MainCanopies.SingleOrDefaultAsync(m => m.Id == id) ??
      throw new NotFoundByIdException($"Main canopy with id = \"{id}\" does not exist");

    if (toUpdate.Manufacturer != null)
    {
      mainCanopy.Manufacturer = toUpdate.Manufacturer;
    }

    if (toUpdate.Model != null)
    {
      mainCanopy.Model = toUpdate.Model;
    }

    if (toUpdate.Size != null)
    {
      mainCanopy.Size = toUpdate.Size.Value;
    }

    await context.SaveChangesAsync();

    return mainCanopy;
  }

  /// <summary>
  /// Deletes a main canopy from the db using its ID.
  /// </summary>
  /// <param name="id">The ID of the main canopy to delete.</param>
  /// <returns>Nothing.</returns>
  public static async Task DeleteAsync(Guid id)
  {
    using var context = new Context();
    var mainCanopy = await context.MainCanopies.SingleOrDefaultAsync(m => m.Id == id) ??
      throw new NotFoundByIdException($"Main canopy with id = \"{id}\" does not exist");
    context.MainCanopies.Remove(mainCanopy);
    await context.SaveChangesAsync();
  }
}
