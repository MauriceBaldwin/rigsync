// RigSync | InvalidRequestBodyException.cs

namespace Api.Domains.Exceptions;

/// <summary>
/// A custom exception to indicate that the request body could not be
/// deserialised into the expected type.
/// </summary>
/// <param name="message">A message explaining the error.</param>
public class InvalidRequestBodyException(string message)
  : Exception(message)
{
}