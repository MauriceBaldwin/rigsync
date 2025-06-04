// RigSync | ExceptionHandlerMiddleware.cs

namespace Api.Middleware;

using Api.Middleware.Utilities;
using Microsoft.Azure.Functions.Worker.Middleware;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;
using Api.Domains.Exceptions;

/// <summary>
/// Handles any uncaught exceptions thrown by the application.
/// </summary>
public class ExceptionHandlerMiddleware : IFunctionsWorkerMiddleware
{
  /// <summary>
  /// This middleware will catch any uncaught exceptions thrown by the function
  ///  being ran.
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
    catch (NotFoundByIdException exception)
    {
      logger.LogWarning(exception.Message);
      context.GetInvocationResult().Value = ErrorResponse.NotFound(req!);
    }
    catch (FunctionNotImplementedException exception)
    {
      logger.LogWarning(exception.Message);
      context.GetInvocationResult().Value = ErrorResponse.NotImplemented(req!);
    }
    catch (Exception exception)
    {
      logger.LogError(exception.Message);
      context.GetInvocationResult().Value = ErrorResponse.UnhandledException(req!);
    }
  }
}