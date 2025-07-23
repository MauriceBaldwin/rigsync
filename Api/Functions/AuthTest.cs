// RigSync | AuthTest.cs

namespace Api.Functions;

using System.Text.Json;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;

/// <summary>
/// CRUD operations for main canopies.
/// </summary>
public class AuthTest()
{
  /// <summary>
  /// View user details for testing authentication.
  /// </summary>
  /// <param name="req">HTTP request.</param>
  /// <returns>HTTP response.</returns>
  [Function("AuthTest")]
  public IActionResult Run(
    [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "auth-test")] HttpRequest req)
  {
    return new OkObjectResult(JsonSerializer.Serialize(req.HttpContext.User));
  }
}
