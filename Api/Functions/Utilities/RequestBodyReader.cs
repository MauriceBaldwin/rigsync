// RigSync | RequestBodyReader.cs

namespace Api.Functions.Utilities;

using System.Text.Json;
using Api.Domains.Exceptions;

/// <summary>
/// Useful utility methods for reading a HttpRequest body.
/// </summary>
public static class RequestBodyReader
{
  private static readonly JsonSerializerOptions JsonSerializerOptions =
    new JsonSerializerOptions
    {
      PropertyNameCaseInsensitive = true,
    };

  /// <summary>
  /// Deserialize a JSON request body into a C# class.
  /// </summary>
  /// <typeparam name="T">The type to deserialize the JSON into.</typeparam>
  /// <param name="body">The HttpRequest body, containing a JSON string.</param>
  /// <returns>
  ///   A deserialized C# object.
  /// </returns>
  public static async Task<T> ReadJsonBodyAsync<T>(Stream body)
  {
    string json = await new StreamReader(body).ReadToEndAsync();

    try
    {
      return JsonSerializer.Deserialize<T>(json, JsonSerializerOptions) ??
        throw new InvalidRequestBodyException($"Request body deserialized to null, which is not assignable to type {typeof(T)}");
    }
    catch (JsonException)
    {
      throw new InvalidRequestBodyException($"Failed to deserialize request body into type {typeof(T)}");
    }
  }
}