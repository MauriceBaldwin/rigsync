// RigSync | Greeting.cs

namespace Api.Functions;

using System.Text.Json;
using System.Threading.Tasks;
using Api.Requests.Greeting;
using Api.Responses.Error;
using Api.Responses.Greeting;
using Api.Utilities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;

/// <summary>
/// Greet the user.
/// </summary>
public class Greeting(ILogger<Greeting> logger)
{
  private readonly ILogger<Greeting> logger = logger;

  /// <summary>
  /// Greet the user.
  /// </summary>
  /// <param name="req">HTTP request.</param>
  /// <returns>HTTP response.</returns>
  [Function("Greeting")]
  public async Task<IActionResult> Run(
    [HttpTrigger(AuthorizationLevel.Anonymous, "get", "post", Route = "greeting")] HttpRequest req)
  {
    string? name = null;

    switch (req.Method)
    {
      case "GET":
        {
          this.logger.LogInformation($"GET /api/greeting");

          name = req.Query["name"];

          break;
        }

      case "POST":
        {
          this.logger.LogInformation($"POST /api/greeting");

          try
          {
            Person? person = await RequestBodyReader.ReadJsonBodyAsync<Person>(
              req.Body);

            name = person?.Name;
          }
          catch (JsonException)
          {
            this.logger.LogWarning("Failed to parse request body.");

            return new BadRequestObjectResult(new StandardError(
              ErrorCode.InvalidRequestBody, "Failed to parse request body."));
          }

          break;
        }
    }

    string greeting = Domains.Greeting.GenerateGreeting(name);

    return new OkObjectResult(new GreetingResponse(greeting));
  }
}
