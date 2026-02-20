// RigSync | AAD.cs

namespace Api.Domains;

using Api.Domains.Exceptions;
using Api.Models;
using Api.Requests;
using Microsoft.EntityFrameworkCore;

/// <summary>
/// Provides domain logic to be consumed by the AAD functions.
/// </summary>
public static class AAD
{
  /// <summary>
  /// Count all AADs.
  /// </summary>
  /// <returns>The count of all AADs.</returns>
  public static async Task<int> CountAsync()
  {
    using var context = new Context();
    return await context.AADs.CountAsync();
  }

  /// <summary>
  /// Retrieve a paginated list of AADs.
  /// </summary>
  /// <param name="page">The page number for pagination.</param>
  /// <param name="limit">The limit of items per page for pagination.</param>
  /// <returns>A list of AADs.</returns>
  public static async Task<List<Models.AAD>> ListAsync(int page, int limit)
  {
    using var context = new Context();
    return await context.AADs
      .Skip((page - 1) * limit)
      .Take(limit)
      .ToListAsync();
  }

  /// <summary>
  /// Retrieve a single AAD using its ID.
  /// </summary>
  /// <param name="id">The ID of the AAD to retrieve.</param>
  /// <returns>The AAD with the given ID.</returns>
  public static async Task<Models.AAD> GetAsync(Guid id)
  {
    using var context = new Context();
    return await context.AADs.SingleOrDefaultAsync(a => a.Id == id) ??
      throw new NotFoundByIdException($"AAD with id = \"{id}\" does not exist");
  }

  /// <summary>
  /// Creates an AAD in the db.
  /// </summary>
  /// <param name="toCreate">The AAD to be created.</param>
  /// <param name="user">The owner of the AAD to be created.</param>
  /// <returns>The newly created AAD.</returns>
  public static async Task<Models.AAD> CreateAsync(CreateAADRequest toCreate, AuthProfile user)
  {
    using var context = new Context();
    var aad = new Models.AAD(toCreate, user);

    await context.AADs.AddAsync(aad);
    await context.SaveChangesAsync();

    return aad;
  }

  /// <summary>
  /// Updates an AAD in the db.
  /// </summary>
  /// <param name="id">The ID of the AAD to update.</param>
  /// <param name="toUpdate">The AAD info to be updated.</param>
  /// <returns>The updated AAD.</returns>
  public static async Task<Models.AAD> UpdateAsync(Guid id, UpdateAADRequest toUpdate)
  {
    using var context = new Context();
    var aad = await context.AADs.SingleOrDefaultAsync(a => a.Id == id) ??
      throw new NotFoundByIdException($"AAD with id = \"{id}\" does not exist");

    if (toUpdate.Manufacturer != null)
    {
      aad.Manufacturer = toUpdate.Manufacturer;
    }

    if (toUpdate.Model != null)
    {
      aad.Model = toUpdate.Model;
    }

    if (toUpdate.NextServiceDue != null)
    {
      aad.NextServiceDue = toUpdate.NextServiceDue.Value;
    }

    if (toUpdate.EndOfLife != null)
    {
      aad.EndOfLife = toUpdate.EndOfLife.Value;
    }

    await context.SaveChangesAsync();

    return aad;
  }

  /// <summary>
  /// Deletes an AAD from the db using its ID.
  /// </summary>
  /// <param name="id">The ID of the AAD to delete.</param>
  /// <returns>Nothing.</returns>
  public static async Task DeleteAsync(Guid id)
  {
    using var context = new Context();
    var aad = await context.AADs.SingleOrDefaultAsync(a => a.Id == id) ??
      throw new NotFoundByIdException($"AAD with id = \"{id}\" does not exist");
    context.AADs.Remove(aad);
    await context.SaveChangesAsync();
  }
}
