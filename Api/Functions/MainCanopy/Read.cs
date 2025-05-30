// RigSync | Read.cs

namespace Api.Functions.MainCanopy;

using System.Collections.Generic;
using Api.Responses;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Extensions.Sql;
using Microsoft.Extensions.Logging;

/// <summary>
/// Retrieve a single main canopy.
/// </summary>
public class Read(ILogger<Greeting> logger)
{
  private readonly ILogger<Greeting> logger = logger;

  /// <summary>
  /// List all main canopies.
  /// </summary>
  /// <param name="req">HTTP request.</param>
  /// <param name="id">ID of the main canopy to retrieve.</param>
  /// <param name="mainCanopies">Result of SQL input binding.</param>
  /// <returns>HTTP response.</returns>
  [Function("MainCanopy_Read")]
  public IActionResult Run(
    [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "main-canopy/{id}")] HttpRequest req,
    string id,
    [SqlInput(
      commandText: "SELECT * FROM MainCanopies WHERE Id = @id",
      parameters: "@id={id}",
      connectionStringSetting: "SqlConnectionString")]
    IEnumerable<Models.MainCanopy> mainCanopies)
  {
    this.logger.LogInformation($"GET /api/main-canopy/{id}");

    if (!mainCanopies.Any())
    {
      throw new KeyNotFoundException($"Could not find main canopy with ID {id}");
    }

    return new OkObjectResult(new MainCanopyResponse(mainCanopies.First()));
  }
}
