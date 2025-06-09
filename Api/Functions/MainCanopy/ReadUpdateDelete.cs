// RigSync | ReadUpdateDelete.cs

namespace Api.Functions.MainCanopy;

using Api.Domains;
using Api.Domains.Exceptions;
using Api.Responses;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;

/// <summary>
/// Create, Read, Update, Delete main canopies.
/// </summary>
public class ReadUpdateDelete(ILogger<ReadUpdateDelete> logger)
{
  private readonly ILogger<ReadUpdateDelete> logger = logger;

  /// <summary>
  /// Create, Read, Update, Delete main canopies.
  /// </summary>
  /// <param name="req">HTTP request.</param>
  /// <param name="id">Main canopy id.</param>
  /// <returns>HTTP response.</returns>
  [Function("MainCanopy_ReadUpdateDelete")]
  public async Task<IActionResult> Run(
    [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", "delete", Route = "main-canopy/{id}")] HttpRequest req,
    Guid id)
  {
    switch (req.Method)
    {
      case "GET":
        this.logger.LogInformation($"GET /api/main-canopy/{id}");
        var mainCanopy = await MainCanopy.GetAsync(id);
        return new OkObjectResult(new MainCanopyResponse(mainCanopy));

      default:
        throw new FunctionNotImplementedException($"{req.Method} /api/main-canopy/{id} not implemented");
    }
  }
}
