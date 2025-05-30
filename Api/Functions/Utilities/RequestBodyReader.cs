// RigSync | RequestBodyReader.cs

namespace Api.Functions.Utilities;

using System.Text.Json;

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
  ///   A deserialized C# object. Note this may be null, since 'null' is a valid JSON string.
  /// </returns>
  public static async Task<T?> ReadJsonBodyAsync<T>(Stream body)
  {
    string json = await new StreamReader(body).ReadToEndAsync();
    return JsonSerializer.Deserialize<T>(json, JsonSerializerOptions);
  }
}