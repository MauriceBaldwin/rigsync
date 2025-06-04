// RigSync | NotFoundByIdException.cs

namespace Api.Domains.Exceptions;

/// <summary>
/// A custom exception to represent a situation where an entity was requested by
/// its ID, but no entity with the given ID could be found.
/// </summary>
/// <param name="message">A message explaining the error.</param>
public class NotFoundByIdException(string message)
  : Exception(message)
{
}