// RigSync | Rig.cs

namespace Api.Domains;

using Api.Domains.Exceptions;
using Api.Models;
using Api.Requests;
using Microsoft.EntityFrameworkCore;

/// <summary>
/// Provides domain logic to be consumed by the Rig functions.
/// </summary>
public static class Rig
{
  /// <summary>
  /// Filters the queryable collection of rigs to items the user has access to.
  /// </summary>
  /// <param name="query">The queryable to filter.</param>
  /// <param name="user">The user whose access should be checked.</param>
  /// <returns>A filtered <see cref="IQueryable{Rig}"/>.</returns>
  public static IQueryable<Models.Rig> HasAccess(this IQueryable<Models.Rig> query, AuthProfile user)
  {
    return query.Where(rig => rig.OwnerId == user.Id);
  }

  /// <summary>
  /// Eager loads all related entities for the rig. (Useful when querying).
  /// </summary>
  /// <param name="query">The queryable to load related entities for.</param>
  /// <returns>The queryable with all related entities loaded.</returns>
  public static IQueryable<Models.Rig> IncludeRelated(this IQueryable<Models.Rig> query)
  {
    return query
      .Include(r => r.MainCanopy)
      .Include(r => r.ReserveCanopy)
      .Include(r => r.Container)
      .Include(r => r.AAD);
  }

  /// <summary>
  /// Eager loads all related entities for the rig. (Useful after create/update).
  /// </summary>
  /// <param name="rig">The rig to load related entities for.</param>
  /// <param name="context">The context to use for loading.</param>
  /// <returns>The rig with all related entities loaded.</returns>
  public static async Task<Models.Rig> GetRelatedAsync(this Models.Rig rig, Context context)
  {
    await context.Entry(rig).Reference(r => r.MainCanopy).LoadAsync();
    await context.Entry(rig).Reference(r => r.ReserveCanopy).LoadAsync();
    await context.Entry(rig).Reference(r => r.Container).LoadAsync();
    await context.Entry(rig).Reference(r => r.AAD).LoadAsync();

    return rig;
  }

  /// <summary>
  /// Count all rigs.
  /// </summary>
  /// <param name="user">The user whose rigs are to be counted.</param>
  /// <returns>The count of all rigs for the given user.</returns>
  public static async Task<int> CountAsync(AuthProfile user)
  {
    using var context = new Context();

    return await context.Rigs
      .HasAccess(user)
      .CountAsync();
  }

  /// <summary>
  /// Retrieve a paginated list of rigs.
  /// </summary>
  /// <param name="page">The page number for pagination.</param>
  /// <param name="limit">The limit of items per page for pagination.</param>
  /// <param name="user">The user whose rigs are to be retrieved.</param>
  /// <returns>A list of rigs.</returns>
  public static async Task<List<Models.Rig>> ListAsync(int page, int limit, AuthProfile user)
  {
    using var context = new Context();

    return await context.Rigs
      .HasAccess(user)
      .IncludeRelated()
      .Skip((page - 1) * limit)
      .Take(limit)
      .ToListAsync();
  }

  /// <summary>
  /// Retrieve a single rig using its ID.
  /// </summary>
  /// <param name="id">The ID of the rig to retrieve.</param>
  /// <param name="user">The user retrieving the rig.</param>
  /// <returns>The rig with the given ID.</returns>
  public static async Task<Models.Rig> GetAsync(Guid id, AuthProfile user)
  {
    using var context = new Context();

    return await context.Rigs
      .HasAccess(user)
      .IncludeRelated()
      .SingleOrDefaultAsync(r => r.Id == id)
    ??
      throw new NotFoundByIdException($"Rig with id = \"{id}\" does not exist");
  }

  /// <summary>
  /// Creates a rig in the db.
  /// </summary>
  /// <param name="toCreate">The rig to be created.</param>
  /// <param name="user">The owner of the rig to be created.</param>
  /// <returns>The newly created rig.</returns>
  public static async Task<Models.Rig> CreateAsync(CreateRigRequest toCreate, AuthProfile user)
  {
    using var context = new Context();
    var rig = new Models.Rig(toCreate, user);

    await context.Rigs.AddAsync(rig);
    await context.SaveChangesAsync();

    return await GetRelatedAsync(rig, context);
  }

  /// <summary>
  /// Updates a rig in the db.
  /// </summary>
  /// <param name="id">The ID of the rig to update.</param>
  /// <param name="toUpdate">The rig info to be updated.</param>
  /// <param name="user">The user updating the rig.</param>
  /// <returns>The updated rig.</returns>
  public static async Task<Models.Rig> UpdateAsync(Guid id, UpdateRigRequest toUpdate, AuthProfile user)
  {
    using var context = new Context();

    var rig = await context.Rigs
      .HasAccess(user)
      .SingleOrDefaultAsync(r => r.Id == id)
    ??
      throw new NotFoundByIdException($"Rig with id = \"{id}\" does not exist");

    if (toUpdate.Name != null)
    {
      rig.Name = toUpdate.Name;
    }

    if (toUpdate.NextReserveRepackDue != null)
    {
      rig.NextReserveRepackDue = toUpdate.NextReserveRepackDue?.ToDateOnly();
    }

    if (toUpdate.MainCanopyId.HasValue)
    {
      rig.MainCanopyId = toUpdate.MainCanopyId.Value;
    }

    if (toUpdate.ReserveCanopyId.HasValue)
    {
      rig.ReserveCanopyId = toUpdate.ReserveCanopyId.Value;
    }

    if (toUpdate.ContainerId.HasValue)
    {
      rig.ContainerId = toUpdate.ContainerId.Value;
    }

    if (toUpdate.AADId.HasValue)
    {
      rig.AADId = toUpdate.AADId.Value;
    }

    await context.SaveChangesAsync();

    return await GetRelatedAsync(rig, context);
  }

  /// <summary>
  /// Deletes a rig from the db using its ID.
  /// </summary>
  /// <param name="id">The ID of the rig to delete.</param>
  /// <param name="user">The user deleting the rig.</param>
  /// <returns>Nothing.</returns>
  public static async Task DeleteAsync(Guid id, AuthProfile user)
  {
    using var context = new Context();

    var rig = await context.Rigs
      .HasAccess(user)
      .SingleOrDefaultAsync(r => r.Id == id)
    ??
      throw new NotFoundByIdException($"Rig with id = \"{id}\" does not exist");

    context.Rigs.Remove(rig);
    await context.SaveChangesAsync();
  }
}
