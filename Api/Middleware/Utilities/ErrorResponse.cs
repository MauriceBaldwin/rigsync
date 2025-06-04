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
  private const string ContentTypeHeader = "Content-Type";
  private const string JsonContentType = "application/json; charset=utf-8";

  private static readonly JsonSerializerOptions JsonSerializerOptions =
    new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

  /// <summary>
  /// Build response body for 404 Not Found error.
  /// </summary>
  /// <param name="req">The HTTP request.</param>
  /// <returns>The HTTP response.</returns>
  public static async Task<HttpResponseData> NotFound(HttpRequestData req)
  {
    return await BuildJsonResponse(
      req,
      HttpStatusCode.NotFound,
      ErrorCode.NotFound,
      "The requested resource could not be found.");
  }

  /// <summary>
  /// Build response body for 501 Not Implemented error.
  /// </summary>
  /// <param name="req">The HTTP request.</param>
  /// <returns>The HTTP response.</returns>
  public static async Task<HttpResponseData> NotImplemented(HttpRequestData req)
  {
    return await BuildJsonResponse(
      req,
      HttpStatusCode.NotImplemented,
      ErrorCode.NotImplemented,
      "The requested function is not implemented.");
  }

  /// <summary>
  /// Build response body for 500 Internal Server Error.
  /// </summary>
  /// <param name="req">The HTTP request.</param>
  /// <returns>The HTTP response.</returns>
  public static async Task<HttpResponseData> UnhandledException(HttpRequestData req)
  {
    return await BuildJsonResponse(
      req,
      HttpStatusCode.InternalServerError,
      ErrorCode.UnhandledException,
      "An unhandled exception occurred.");
  }

  private static async Task<HttpResponseData> BuildJsonResponse(
    HttpRequestData req,
    HttpStatusCode statusCode,
    ErrorCode errorCode,
    string message)
  {
    var res = req.CreateResponse(statusCode);
    res.Headers.Add(ContentTypeHeader, JsonContentType);
    var body = new StandardErrorResponse(errorCode, message);
    await res.WriteStringAsync(JsonSerializer.Serialize(body, JsonSerializerOptions));
    return res;
  }
}