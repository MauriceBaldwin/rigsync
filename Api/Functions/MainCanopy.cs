// RigSync | MainCanopy.cs

namespace Api.Functions;

using System.Net;
using Api.Functions.Utilities;
using Api.Requests;
using Api.Responses;
using Api.Responses.Error;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Azure.WebJobs.Extensions.OpenApi.Core.Attributes;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;

/// <summary>
/// CRUD operations for main canopies.
/// </summary>
public class MainCanopy(ILogger<MainCanopy> logger)
{
  private readonly ILogger<MainCanopy> logger = logger;

  /// <summary>
  /// List main canopies.
  /// </summary>
  /// <param name="req">HTTP request.</param>
  /// <returns>HTTP response.</returns>
  [Function("MainCanopy_List")]
  [OpenApiOperation(operationId: "MainCanopy_List", tags: new[] { "main-canopy" })]
  [OpenApiParameter(name: "page", In = ParameterLocation.Query, Type = typeof(int))]
  [OpenApiParameter(name: "limit", In = ParameterLocation.Query, Type = typeof(int))]
  [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "application/json", bodyType: typeof(MainCanopiesResponse))]
  public async Task<IActionResult> List(
    [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "main-canopy")] HttpRequest req)
  {
    this.logger.LogInformation("GET /api/main-canopy");
    var page = QueryParamReader.ReadPositiveNonZeroIntOrDefault(req, "page") ?? 1;
    var limit = QueryParamReader.ReadPositiveNonZeroIntOrDefault(req, "limit") ?? 10;
    var count = await Domains.MainCanopy.CountAsync();
    var mainCanopies = await Domains.MainCanopy.ListAsync(page, limit);
    return new OkObjectResult(new MainCanopiesResponse(mainCanopies, page, limit, count));
  }

  /// <summary>
  /// Create a main canopy.
  /// </summary>
  /// <param name="req">HTTP request.</param>
  /// <returns>HTTP response.</returns>
  [Function("MainCanopy_Create")]
  [OpenApiOperation(operationId: "MainCanopy_Create", tags: new[] { "main-canopy" })]
  [OpenApiRequestBody(contentType: "application/json", bodyType: typeof(CreateMainCanopyRequest), Required = true)]
  [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "application/json", bodyType: typeof(MainCanopyResponse))]
  [OpenApiResponseWithBody(statusCode: HttpStatusCode.BadRequest, contentType: "application/json", bodyType: typeof(StandardErrorResponse))]
  public async Task<IActionResult> Create(
    [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "main-canopy")] HttpRequest req)
  {
    this.logger.LogInformation("POST /api/main-canopy");
    var mainCanopyRequest = await RequestBodyReader.ReadJsonBodyAsync<CreateMainCanopyRequest>(req.Body);
    var newMainCanopy = await Domains.MainCanopy.CreateAsync(mainCanopyRequest);
    return new OkObjectResult(new MainCanopyResponse(newMainCanopy));
  }

  /// <summary>
  /// Read a main canopy.
  /// </summary>
  /// <param name="req">HTTP request.</param>
  /// <param name="id">Main canopy id.</param>
  /// <returns>HTTP response.</returns>
  [Function("MainCanopy_Read")]
  [OpenApiOperation(operationId: "MainCanopy_Read", tags: new[] { "main-canopy" })]
  [OpenApiParameter(name: "id", In = ParameterLocation.Path, Required = true, Type = typeof(Guid))]
  [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "application/json", bodyType: typeof(MainCanopyResponse))]
  [OpenApiResponseWithBody(statusCode: HttpStatusCode.NotFound, contentType: "application/json", bodyType: typeof(StandardErrorResponse))]
  public async Task<IActionResult> Read(
    [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "main-canopy/{id}")] HttpRequest req,
    Guid id)
  {
    this.logger.LogInformation($"GET /api/main-canopy/{id}");
    var mainCanopy = await Domains.MainCanopy.GetAsync(id);
    return new OkObjectResult(new MainCanopyResponse(mainCanopy));
  }

  /// <summary>
  /// Update a main canopy.
  /// </summary>
  /// <param name="req">HTTP request.</param>
  /// <param name="id">Main canopy id.</param>
  /// <returns>HTTP response.</returns>
  [Function("MainCanopy_Update")]
  [OpenApiOperation(operationId: "MainCanopy_Update", tags: new[] { "main-canopy" })]
  [OpenApiParameter(name: "id", In = ParameterLocation.Path, Required = true, Type = typeof(Guid))]
  [OpenApiRequestBody(contentType: "application/json", bodyType: typeof(UpdateMainCanopyRequest), Required = true)]
  [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "application/json", bodyType: typeof(MainCanopyResponse))]
  [OpenApiResponseWithBody(statusCode: HttpStatusCode.BadRequest, contentType: "application/json", bodyType: typeof(StandardErrorResponse))]
  [OpenApiResponseWithBody(statusCode: HttpStatusCode.NotFound, contentType: "application/json", bodyType: typeof(StandardErrorResponse))]
  public async Task<IActionResult> Update(
    [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "main-canopy/{id}")] HttpRequest req,
    Guid id)
  {
    this.logger.LogInformation($"POST  /api/main-canopy/{id}");
    var mainCanopyRequest = await RequestBodyReader.ReadJsonBodyAsync<UpdateMainCanopyRequest>(req.Body);
    var updatedMainCanopy = await Domains.MainCanopy.UpdateAsync(id, mainCanopyRequest);
    return new OkObjectResult(new MainCanopyResponse(updatedMainCanopy));
  }

  /// <summary>
  /// Delete a main canopy.
  /// </summary>
  /// <param name="req">HTTP request.</param>
  /// <param name="id">Main canopy id.</param>
  /// <returns>HTTP response.</returns>
  [Function("MainCanopy_Delete")]
  [OpenApiOperation(operationId: "MainCanopy_Delete", tags: new[] { "main-canopy" })]
  [OpenApiParameter(name: "id", In = ParameterLocation.Path, Required = true, Type = typeof(Guid))]
  [OpenApiResponseWithoutBody(statusCode: HttpStatusCode.NoContent)]
  [OpenApiResponseWithBody(statusCode: HttpStatusCode.NotFound, contentType: "application/json", bodyType: typeof(StandardErrorResponse))]
  public async Task<IActionResult> Delete(
    [HttpTrigger(AuthorizationLevel.Anonymous, "delete", Route = "main-canopy/{id}")] HttpRequest req,
    Guid id)
  {
    this.logger.LogInformation($"DELETE /api/main-canopy/{id}");
    await Domains.MainCanopy.DeleteAsync(id);
    return new NoContentResult();
  }
}
