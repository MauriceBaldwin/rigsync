// RigSync | ReserveCanopy.cs

namespace Api.Domains;

using Api.Domains.Exceptions;
using Api.Models;
using Api.Requests;
using Microsoft.EntityFrameworkCore;

/// <summary>
/// Provides domain logic to be consumed by the ReserveCanopy functions.
/// </summary>
public static class ReserveCanopy
{
  /// <summary>
  /// Count all reserve canopies.
  /// </summary>
  /// <returns>The count of all reserve canopies.</returns>
  public static async Task<int> CountAsync()
  {
    using var context = new Context();
    return await context.ReserveCanopies.CountAsync();
  }

  /// <summary>
  /// Retrieve a paginated list of reserve canopies.
  /// </summary>
  /// <param name="page">The page number for pagination.</param>
  /// <param name="limit">The limit of items per page for pagination.</param>
  /// <returns>A list of reserve canopies.</returns>
  public static async Task<List<Models.ReserveCanopy>> ListAsync(int page, int limit)
  {
    using var context = new Context();
    return await context.ReserveCanopies
      .Skip((page - 1) * limit)
      .Take(limit)
      .ToListAsync();
  }

  /// <summary>
  /// Retrieve a single reserve canopy using its ID.
  /// </summary>
  /// <param name="id">The ID of the reserve canopy to retrieve.</param>
  /// <returns>The reserve canopy with the given ID.</returns>
  public static async Task<Models.ReserveCanopy> GetAsync(Guid id)
  {
    using var context = new Context();
    return await context.ReserveCanopies.SingleOrDefaultAsync(r => r.Id == id) ??
      throw new NotFoundByIdException($"Reserve canopy with id = \"{id}\" does not exist");
  }

  /// <summary>
  /// Creates a reserve canopy in the db.
  /// </summary>
  /// <param name="toCreate">The reserve canopy to be created.</param>
  /// <returns>The newly created reserve canopy.</returns>
  public static async Task<Models.ReserveCanopy> CreateAsync(CreateReserveCanopyRequest toCreate)
  {
    using var context = new Context();
    var reserveCanopy = new Models.ReserveCanopy(toCreate);

    await context.ReserveCanopies.AddAsync(reserveCanopy);
    await context.SaveChangesAsync();

    return reserveCanopy;
  }

  /// <summary>
  /// Updates a reserve canopy in the db.
  /// </summary>
  /// <param name="id">The ID of the reserve canopy to update.</param>
  /// <param name="toUpdate">The reserve canopy info to be updated.</param>
  /// <returns>The updated reserve canopy.</returns>
  public static async Task<Models.ReserveCanopy> UpdateAsync(Guid id, UpdateReserveCanopyRequest toUpdate)
  {
    using var context = new Context();
    var reserveCanopy = await context.ReserveCanopies.SingleOrDefaultAsync(r => r.Id == id) ??
      throw new NotFoundByIdException($"Reserve canopy with id = \"{id}\" does not exist");

    if (toUpdate.Manufacturer != null)
    {
      reserveCanopy.Manufacturer = toUpdate.Manufacturer;
    }

    if (toUpdate.Model != null)
    {
      reserveCanopy.Model = toUpdate.Model;
    }

    if (toUpdate.Size != null)
    {
      reserveCanopy.Size = toUpdate.Size.Value;
    }

    await context.SaveChangesAsync();

    return reserveCanopy;
  }

  /// <summary>
  /// Deletes a reserve canopy from the db using its ID.
  /// </summary>
  /// <param name="id">The ID of the reserve canopy to delete.</param>
  /// <returns>Nothing.</returns>
  public static async Task DeleteAsync(Guid id)
  {
    using var context = new Context();
    var reserveCanopy = await context.ReserveCanopies.SingleOrDefaultAsync(r => r.Id == id) ??
      throw new NotFoundByIdException($"Reserve canopy with id = \"{id}\" does not exist");
    context.ReserveCanopies.Remove(reserveCanopy);
    await context.SaveChangesAsync();
  }
}
