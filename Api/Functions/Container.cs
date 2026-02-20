// RigSync | Container.cs

namespace Api.Functions;

using System.Net;
using Api.Functions.Utilities;
using Api.Models;
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
/// CRUD operations for containers.
/// </summary>
public class Container(ILogger<Container> logger)
{
  private readonly ILogger<Container> logger = logger;

  /// <summary>
  /// List containers.
  /// </summary>
  /// <param name="req">HTTP request.</param>
  /// <returns>HTTP response.</returns>
  [Function("Container_List")]
  [OpenApiOperation(operationId: "Container_List", tags: new[] { "container" })]
  [OpenApiParameter(name: "page", In = ParameterLocation.Query, Type = typeof(int))]
  [OpenApiParameter(name: "limit", In = ParameterLocation.Query, Type = typeof(int))]
  [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "application/json", bodyType: typeof(ContainersResponse))]
  public async Task<IActionResult> List(
    [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "container")] HttpRequest req)
  {
    this.logger.LogInformation("GET /api/container");
    var page = QueryParamReader.ReadPositiveNonZeroIntOrDefault(req, "page") ?? 1;
    var limit = QueryParamReader.ReadPositiveNonZeroIntOrDefault(req, "limit") ?? 10;
    var count = await Domains.Container.CountAsync();
    var containers = await Domains.Container.ListAsync(page, limit);
    return new OkObjectResult(new ContainersResponse(containers, page, limit, count));
  }

  /// <summary>
  /// Create a container.
  /// </summary>
  /// <param name="req">HTTP request.</param>
  /// <returns>HTTP response.</returns>
  [Function("Container_Create")]
  [OpenApiOperation(operationId: "Container_Create", tags: new[] { "container" })]
  [OpenApiRequestBody(contentType: "application/json", bodyType: typeof(CreateContainerRequest), Required = true)]
  [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "application/json", bodyType: typeof(ContainerResponse))]
  [OpenApiResponseWithBody(statusCode: HttpStatusCode.BadRequest, contentType: "application/json", bodyType: typeof(StandardErrorResponse))]
  public async Task<IActionResult> Create(
    [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "container")] HttpRequest req)
  {
    this.logger.LogInformation("POST /api/container");
    var user = new AuthProfile(req);
    var containerRequest = await RequestBodyReader.ReadJsonBodyAsync<CreateContainerRequest>(req.Body);
    var newContainer = await Domains.Container.CreateAsync(containerRequest, user);
    return new OkObjectResult(new ContainerResponse(newContainer));
  }

  /// <summary>
  /// Read a container.
  /// </summary>
  /// <param name="req">HTTP request.</param>
  /// <param name="id">Container id.</param>
  /// <returns>HTTP response.</returns>
  [Function("Container_Read")]
  [OpenApiOperation(operationId: "Container_Read", tags: new[] { "container" })]
  [OpenApiParameter(name: "id", In = ParameterLocation.Path, Required = true, Type = typeof(Guid))]
  [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "application/json", bodyType: typeof(ContainerResponse))]
  [OpenApiResponseWithBody(statusCode: HttpStatusCode.NotFound, contentType: "application/json", bodyType: typeof(StandardErrorResponse))]
  public async Task<IActionResult> Read(
    [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "container/{id}")] HttpRequest req,
    Guid id)
  {
    this.logger.LogInformation($"GET /api/container/{id}");
    var container = await Domains.Container.GetAsync(id);
    return new OkObjectResult(new ContainerResponse(container));
  }

  /// <summary>
  /// Update a container.
  /// </summary>
  /// <param name="req">HTTP request.</param>
  /// <param name="id">Container id.</param>
  /// <returns>HTTP response.</returns>
  [Function("Container_Update")]
  [OpenApiOperation(operationId: "Container_Update", tags: new[] { "container" })]
  [OpenApiParameter(name: "id", In = ParameterLocation.Path, Required = true, Type = typeof(Guid))]
  [OpenApiRequestBody(contentType: "application/json", bodyType: typeof(UpdateContainerRequest), Required = true)]
  [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "application/json", bodyType: typeof(ContainerResponse))]
  [OpenApiResponseWithBody(statusCode: HttpStatusCode.BadRequest, contentType: "application/json", bodyType: typeof(StandardErrorResponse))]
  [OpenApiResponseWithBody(statusCode: HttpStatusCode.NotFound, contentType: "application/json", bodyType: typeof(StandardErrorResponse))]
  public async Task<IActionResult> Update(
    [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "container/{id}")] HttpRequest req,
    Guid id)
  {
    this.logger.LogInformation($"POST  /api/container/{id}");
    var containerRequest = await RequestBodyReader.ReadJsonBodyAsync<UpdateContainerRequest>(req.Body);
    var updatedContainer = await Domains.Container.UpdateAsync(id, containerRequest);
    return new OkObjectResult(new ContainerResponse(updatedContainer));
  }

  /// <summary>
  /// Delete a container.
  /// </summary>
  /// <param name="req">HTTP request.</param>
  /// <param name="id">Container id.</param>
  /// <returns>HTTP response.</returns>
  [Function("Container_Delete")]
  [OpenApiOperation(operationId: "Container_Delete", tags: new[] { "container" })]
  [OpenApiParameter(name: "id", In = ParameterLocation.Path, Required = true, Type = typeof(Guid))]
  [OpenApiResponseWithoutBody(statusCode: HttpStatusCode.NoContent)]
  [OpenApiResponseWithBody(statusCode: HttpStatusCode.NotFound, contentType: "application/json", bodyType: typeof(StandardErrorResponse))]
  public async Task<IActionResult> Delete(
    [HttpTrigger(AuthorizationLevel.Anonymous, "delete", Route = "container/{id}")] HttpRequest req,
    Guid id)
  {
    this.logger.LogInformation($"DELETE /api/container/{id}");
    await Domains.Container.DeleteAsync(id);
    return new NoContentResult();
  }
}
