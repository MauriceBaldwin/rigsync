// RigSync | List.cs

namespace Api.Functions.MainCanopy;

using System.Collections.Generic;
using Api.Responses;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Extensions.Sql;
using Microsoft.Extensions.Logging;

/// <summary>
/// List all main canopies.
/// </summary>
public class List(ILogger<Greeting> logger)
{
  private readonly ILogger<Greeting> logger = logger;

  /// <summary>
  /// List all main canopies.
  /// </summary>
  /// <param name="req">HTTP request.</param>
  /// <param name="mainCanopies">Result of SQL input binding.</param>
  /// <returns>HTTP response.</returns>
  [Function("MainCanopy_List")]
  public IActionResult Run(
    [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "main-canopy")] HttpRequest req,
    [SqlInput(commandText: "SELECT * FROM MainCanopies", connectionStringSetting: "SqlConnectionString")] IEnumerable<Models.MainCanopy> mainCanopies)
  {
    this.logger.LogInformation("GET /api/main-canopy");

    return new OkObjectResult(new MainCanopiesResponse(mainCanopies));
  }
}
