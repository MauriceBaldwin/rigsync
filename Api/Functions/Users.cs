// RigSync | Users.cs

namespace Api.Functions;

using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.Functions.Worker.Extensions.Sql;
using Microsoft.Extensions.Logging;

/// <summary>
/// View the users.
/// </summary>
public class User(ILogger<Greeting> logger)
{
  private readonly ILogger<Greeting> logger = logger;

  /// <summary>
  /// List all users.
  /// </summary>
  /// <param name="req">HTTP request.</param>
  /// <param name="users">Result of SQL input binding.</param>
  /// <returns>HTTP response.</returns>
  [Function("Users")]
  public IActionResult Run(
    [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "users")] HttpRequest req,
    [SqlInput(commandText: "SELECT * FROM Users", connectionStringSetting: "SqlConnectionString")] IEnumerable<Models.User> users)
  {
    this.logger.LogInformation("GET /api/users");

    return new OkObjectResult(users);
  }
}
