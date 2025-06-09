// RigSync | ListCreate.cs

namespace Api.Functions.MainCanopy;

using Api.Domains;
using Api.Domains.Exceptions;
using Api.Functions.Utilities;
using Api.Requests.MainCanopy;
using Api.Responses;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;

/// <summary>
/// List and create main canopies.
/// </summary>
public class ListCreate(ILogger<ListCreate> logger)
{
  private readonly ILogger<ListCreate> logger = logger;

  /// <summary>
  /// List and create main canopies.
  /// </summary>
  /// <param name="req">HTTP request.</param>
  /// <returns>HTTP response.</returns>
  [Function("MainCanopy_ListCreate")]
  public async Task<IActionResult> Run(
    [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = "main-canopy")] HttpRequest req)
  {
    switch (req.Method)
    {
      case "GET":
        this.logger.LogInformation("GET /api/main-canopy");
        var page = QueryParamReader.ReadPositiveNonZeroIntOrDefault(req, "page") ?? 1;
        var limit = QueryParamReader.ReadPositiveNonZeroIntOrDefault(req, "limit") ?? 10;
        var count = await MainCanopy.CountAsync();
        var mainCanopies = await MainCanopy.ListAsync(page, limit);
        return new OkObjectResult(new MainCanopiesResponse(mainCanopies, page, limit, count));

      case "POST":
        this.logger.LogInformation("POST /api/main-canopy");
        var mainCanopyRequest = await RequestBodyReader.ReadJsonBodyAsync<CreateRequest>(req.Body);
        var newMainCanopy = await MainCanopy.CreateAsync(mainCanopyRequest);
        return new OkObjectResult(new MainCanopyResponse(newMainCanopy));

      default:
        throw new FunctionNotImplementedException($"{req.Method} /api/main-canopy not implemented");
    }
  }
}
