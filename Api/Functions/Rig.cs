// RigSync | Rig.cs

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
/// CRUD operations for rigs.
/// </summary>
public class Rig(ILogger<Rig> logger)
{
  private readonly ILogger<Rig> logger = logger;

  /// <summary>
  /// List rigs.
  /// </summary>
  /// <param name="req">HTTP request.</param>
  /// <returns>HTTP response.</returns>
  [Function("Rig_List")]
  [OpenApiOperation(operationId: "Rig_List", tags: new[] { "rig" })]
  [OpenApiParameter(name: "page", In = ParameterLocation.Query, Type = typeof(int))]
  [OpenApiParameter(name: "limit", In = ParameterLocation.Query, Type = typeof(int))]
  [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "application/json", bodyType: typeof(RigsResponse))]
  public async Task<IActionResult> List(
    [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "rig")] HttpRequest req)
  {
    this.logger.LogInformation("GET /api/rig");

    // Prepare
    var user = new AuthProfile(req);
    var page = QueryParamReader.ReadPositiveNonZeroIntOrDefault(req, "page") ?? 1;
    var limit = QueryParamReader.ReadPositiveNonZeroIntOrDefault(req, "limit") ?? 10;

    // Act
    var count = await Domains.Rig.CountAsync(user);
    var rigs = await Domains.Rig.ListAsync(page, limit, user);

    // Respond
    return new OkObjectResult(new RigsResponse(rigs, page, limit, count));
  }

  /// <summary>
  /// Create a rig.
  /// </summary>
  /// <param name="req">HTTP request.</param>
  /// <returns>HTTP response.</returns>
  [Function("Rig_Create")]
  [OpenApiOperation(operationId: "Rig_Create", tags: new[] { "rig" })]
  [OpenApiRequestBody(contentType: "application/json", bodyType: typeof(CreateRigRequest), Required = true)]
  [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "application/json", bodyType: typeof(RigResponse))]
  [OpenApiResponseWithBody(statusCode: HttpStatusCode.BadRequest, contentType: "application/json", bodyType: typeof(StandardErrorResponse))]
  public async Task<IActionResult> Create(
    [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "rig")] HttpRequest req)
  {
    this.logger.LogInformation("POST /api/rig");

    // Prepare
    var user = new AuthProfile(req);
    var rigRequest = await RequestBodyReader.ReadJsonBodyAsync<CreateRigRequest>(req.Body);

    // Act
    var newRig = await Domains.Rig.CreateAsync(rigRequest, user);

    // Respond
    return new OkObjectResult(new RigResponse(newRig));
  }

  /// <summary>
  /// Read a rig.
  /// </summary>
  /// <param name="req">HTTP request.</param>
  /// <param name="id">Rig id.</param>
  /// <returns>HTTP response.</returns>
  [Function("Rig_Read")]
  [OpenApiOperation(operationId: "Rig_Read", tags: new[] { "rig" })]
  [OpenApiParameter(name: "id", In = ParameterLocation.Path, Required = true, Type = typeof(Guid))]
  [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "application/json", bodyType: typeof(RigResponse))]
  [OpenApiResponseWithBody(statusCode: HttpStatusCode.NotFound, contentType: "application/json", bodyType: typeof(StandardErrorResponse))]
  public async Task<IActionResult> Read(
    [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "rig/{id}")] HttpRequest req,
    Guid id)
  {
    this.logger.LogInformation($"GET /api/rig/{id}");

    // Prepare
    var user = new AuthProfile(req);

    // Act
    var rig = await Domains.Rig.GetAsync(id, user);

    // Respond
    return new OkObjectResult(new RigResponse(rig));
  }

  /// <summary>
  /// Update a rig.
  /// </summary>
  /// <param name="req">HTTP request.</param>
  /// <param name="id">Rig id.</param>
  /// <returns>HTTP response.</returns>
  [Function("Rig_Update")]
  [OpenApiOperation(operationId: "Rig_Update", tags: new[] { "rig" })]
  [OpenApiParameter(name: "id", In = ParameterLocation.Path, Required = true, Type = typeof(Guid))]
  [OpenApiRequestBody(contentType: "application/json", bodyType: typeof(UpdateRigRequest), Required = true)]
  [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "application/json", bodyType: typeof(RigResponse))]
  [OpenApiResponseWithBody(statusCode: HttpStatusCode.BadRequest, contentType: "application/json", bodyType: typeof(StandardErrorResponse))]
  [OpenApiResponseWithBody(statusCode: HttpStatusCode.NotFound, contentType: "application/json", bodyType: typeof(StandardErrorResponse))]
  public async Task<IActionResult> Update(
    [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "rig/{id}")] HttpRequest req,
    Guid id)
  {
    this.logger.LogInformation($"POST /api/rig/{id}");

    // Prepare
    var user = new AuthProfile(req);
    var rigRequest = await RequestBodyReader.ReadJsonBodyAsync<UpdateRigRequest>(req.Body);

    // Act
    var updatedRig = await Domains.Rig.UpdateAsync(id, rigRequest, user);

    // Respond
    return new OkObjectResult(new RigResponse(updatedRig));
  }

  /// <summary>
  /// Delete a rig.
  /// </summary>
  /// <param name="req">HTTP request.</param>
  /// <param name="id">Rig id.</param>
  /// <returns>HTTP response.</returns>
  [Function("Rig_Delete")]
  [OpenApiOperation(operationId: "Rig_Delete", tags: new[] { "rig" })]
  [OpenApiParameter(name: "id", In = ParameterLocation.Path, Required = true, Type = typeof(Guid))]
  [OpenApiResponseWithoutBody(statusCode: HttpStatusCode.NoContent)]
  [OpenApiResponseWithBody(statusCode: HttpStatusCode.NotFound, contentType: "application/json", bodyType: typeof(StandardErrorResponse))]
  public async Task<IActionResult> Delete(
    [HttpTrigger(AuthorizationLevel.Anonymous, "delete", Route = "rig/{id}")] HttpRequest req,
    Guid id)
  {
    this.logger.LogInformation($"DELETE /api/rig/{id}");

    // Prepare
    var user = new AuthProfile(req);

    // Act
    await Domains.Rig.DeleteAsync(id, user);

    // Respond
    return new NoContentResult();
  }
}
