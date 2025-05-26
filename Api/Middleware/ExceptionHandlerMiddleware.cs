// RigSync | ExceptionHandlerMiddleware.cs

namespace Api.Middleware;

using System.Net;
using Microsoft.Azure.Functions.Worker.Middleware;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using Microsoft.Azure.Functions.Worker.Http;
using Api.Responses.Error;
using System.Text.Json;

/// <summary>
/// Handles any uncaught exceptions thrown by the application.
/// </summary>
public class ExceptionHandlerMiddleware : IFunctionsWorkerMiddleware
{
  private readonly JsonSerializerOptions jsonSerializerOptions =
    new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase };

  /// <summary>
  /// This middleware will catch any uncaught excpetions thrown by the function
  ///  beging ran.
  /// </summary>
  /// <param name="context">The function context.</param>
  /// <param name="next">The function that will be ran.</param>
  /// <returns>
  ///   A standardised error message if an uncaught exception is produced.
  /// </returns>
  public async Task Invoke(FunctionContext context, FunctionExecutionDelegate next)
  {
    var logger = context.GetLogger<ExceptionHandlerMiddleware>();
    var req = await context.GetHttpRequestDataAsync();

    try
    {
      await next.Invoke(context);
    }
    catch (FileNotFoundException exception)
    {
      logger.LogWarning(exception.Message);

      var res = req!.CreateResponse(HttpStatusCode.NotFound);
      res.Headers.Add("Content-Type", "application/json; charset=utf-8");

      var body = new StandardError(
        ErrorCode.NotFound,
        "The requested resource could not be found.");

      await res.WriteStringAsync(JsonSerializer.Serialize(
        body,
        this.jsonSerializerOptions));

      context.GetInvocationResult().Value = res;
    }
    catch (Exception exception)
    {
      logger.LogError(exception.Message);

      var res = req!.CreateResponse(HttpStatusCode.InternalServerError);
      res.Headers.Add("Content-Type", "application/json; charset=utf-8");

      var body = new StandardError(
        ErrorCode.UnhandledException,
        "An unhandled exception occurred.");

      await res.WriteStringAsync(JsonSerializer.Serialize(
        body,
        this.jsonSerializerOptions));

      context.GetInvocationResult().Value = res;
    }
  }
}