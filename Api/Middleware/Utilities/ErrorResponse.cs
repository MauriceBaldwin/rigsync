// RigSync | ErrorResponse.cs

namespace Api.Middleware.Utilities;

using System.Net;
using System.Text.Json;
using Api.Responses.Error;
using Microsoft.Azure.Functions.Worker.Http;

/// <summary>
/// Build HTTP responses for common error types.
/// </summary>
public static class ErrorResponse
{
  private static readonly JsonSerializerOptions JsonSerializerOptions =
    new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

  /// <summary>
  /// Build response body for 404 Not Found error.
  /// </summary>
  /// <param name="req">The HTTP request.</param>
  /// <returns>The HTTP response.</returns>
  public static async Task<HttpResponseData> NotFound(HttpRequestData req)
  {
    var res = req.CreateResponse(HttpStatusCode.NotFound);
    res.Headers.Add("Content-Type", "application/json; charset=utf-8");

    var body = new StandardError(
      ErrorCode.NotFound,
      "The requested resource could not be found.");

    await res.WriteStringAsync(JsonSerializer.Serialize(
      body,
      JsonSerializerOptions));

    return res;
  }

  /// <summary>
  /// Build response body for 500 Internal Server Error.
  /// </summary>
  /// <param name="req">The HTTP request.</param>
  /// <returns>The HTTP response.</returns>
  public static async Task<HttpResponseData> UnhandledException(HttpRequestData req)
  {
    var res = req.CreateResponse(HttpStatusCode.InternalServerError);
    res.Headers.Add("Content-Type", "application/json; charset=utf-8");

    var body = new StandardError(
      ErrorCode.UnhandledException,
      "An unhandled exception occurred.");

    await res.WriteStringAsync(JsonSerializer.Serialize(
      body,
      JsonSerializerOptions));

    return res;
  }
}