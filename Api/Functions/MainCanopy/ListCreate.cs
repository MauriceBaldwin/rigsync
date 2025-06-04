// RigSync | ListCreate.cs

namespace Api.Functions.MainCanopy;

using Api.Domains.Exceptions;
using Api.Functions.Utilities;
using Api.Models;
using Api.Responses;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

/// <summary>
/// List and create main canopies.
/// </summary>
public class ListCreate(ILogger<Greeting> logger)
{
  private readonly ILogger<Greeting> logger = logger;

  /// <summary>
  /// List and create main canopies.
  /// </summary>
  /// <param name="req">HTTP request.</param>
  /// <returns>HTTP response.</returns>
  [Function("MainCanopy_ListCreate")]
  public async Task<IActionResult> Run(
    [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = "main-canopy")] HttpRequest req)
  {
    var context = new Context();

    switch (req.Method)
    {
      case "GET":
        this.logger.LogInformation("GET /api/main-canopy");

        var page = QueryParamReader.ReadPositiveNonZeroIntOrDefault(req, "page") ?? 1;
        var limit = QueryParamReader.ReadPositiveNonZeroIntOrDefault(req, "limit") ?? 10;
        var count = await context.MainCanopies.CountAsync();

        var mainCanopies = await context.MainCanopies
          .Skip((page - 1) * limit)
          .Take(limit)
          .ToListAsync();

        return new OkObjectResult(new MainCanopiesResponse(mainCanopies, page, limit, count));

      default:
        throw new FunctionNotImplementedException($"{req.Method} /api/main-canopy not implemented");
    }
  }
}
