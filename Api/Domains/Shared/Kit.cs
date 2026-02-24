// RigSync | Kit.cs

namespace Api.Domains.Shared;

using Api.Models;

/// <summary>
/// Shared domain logic for kit-related entities.
/// </summary>
public static class Kit
{
  /// <summary>
  /// Filters the queryable collection to items the user has access to.
  /// </summary>
  /// <typeparam name="T">A kit-derived entity type.</typeparam>
  /// <param name="query">The queryable to filter.</param>
  /// <param name="user">The user whose access should be checked.</param>
  /// <returns>A filtered <see cref="IQueryable{T}"/>.</returns>
  public static IQueryable<T> HasAccess<T>(this IQueryable<T> query, AuthProfile user)
    where T : Models.Shared.Kit
  {
    return query.Where(kit => kit.OwnerId == user.Id);
  }
}
