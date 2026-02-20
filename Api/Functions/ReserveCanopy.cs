// RigSync | ReserveCanopy.cs

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
/// CRUD operations for reserve canopies.
/// </summary>
public class ReserveCanopy(ILogger<ReserveCanopy> logger)
{
  private readonly ILogger<ReserveCanopy> logger = logger;

  /// <summary>
  /// List reserve canopies.
  /// </summary>
  /// <param name="req">HTTP request.</param>
  /// <returns>HTTP response.</returns>
  [Function("ReserveCanopy_List")]
  [OpenApiOperation(operationId: "ReserveCanopy_List", tags: new[] { "reserve-canopy" })]
  [OpenApiParameter(name: "page", In = ParameterLocation.Query, Type = typeof(int))]
  [OpenApiParameter(name: "limit", In = ParameterLocation.Query, Type = typeof(int))]
  [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "application/json", bodyType: typeof(ReserveCanopiesResponse))]
  public async Task<IActionResult> List(
    [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "reserve-canopy")] HttpRequest req)
  {
    this.logger.LogInformation("GET /api/reserve-canopy");
    var page = QueryParamReader.ReadPositiveNonZeroIntOrDefault(req, "page") ?? 1;
    var limit = QueryParamReader.ReadPositiveNonZeroIntOrDefault(req, "limit") ?? 10;
    var count = await Domains.ReserveCanopy.CountAsync();
    var reserveCanopies = await Domains.ReserveCanopy.ListAsync(page, limit);
    return new OkObjectResult(new ReserveCanopiesResponse(reserveCanopies, page, limit, count));
  }

  /// <summary>
  /// Create a reserve canopy.
  /// </summary>
  /// <param name="req">HTTP request.</param>
  /// <returns>HTTP response.</returns>
  [Function("ReserveCanopy_Create")]
  [OpenApiOperation(operationId: "ReserveCanopy_Create", tags: new[] { "reserve-canopy" })]
  [OpenApiRequestBody(contentType: "application/json", bodyType: typeof(CreateReserveCanopyRequest), Required = true)]
  [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "application/json", bodyType: typeof(ReserveCanopyResponse))]
  [OpenApiResponseWithBody(statusCode: HttpStatusCode.BadRequest, contentType: "application/json", bodyType: typeof(StandardErrorResponse))]
  public async Task<IActionResult> Create(
    [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "reserve-canopy")] HttpRequest req)
  {
    this.logger.LogInformation("POST /api/reserve-canopy");
    var user = new AuthProfile(req);
    var reserveCanopyRequest = await RequestBodyReader.ReadJsonBodyAsync<CreateReserveCanopyRequest>(req.Body);
    var newReserveCanopy = await Domains.ReserveCanopy.CreateAsync(reserveCanopyRequest, user);
    return new OkObjectResult(new ReserveCanopyResponse(newReserveCanopy));
  }

  /// <summary>
  /// Read a reserve canopy.
  /// </summary>
  /// <param name="req">HTTP request.</param>
  /// <param name="id">Reserve canopy id.</param>
  /// <returns>HTTP response.</returns>
  [Function("ReserveCanopy_Read")]
  [OpenApiOperation(operationId: "ReserveCanopy_Read", tags: new[] { "reserve-canopy" })]
  [OpenApiParameter(name: "id", In = ParameterLocation.Path, Required = true, Type = typeof(Guid))]
  [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "application/json", bodyType: typeof(ReserveCanopyResponse))]
  [OpenApiResponseWithBody(statusCode: HttpStatusCode.NotFound, contentType: "application/json", bodyType: typeof(StandardErrorResponse))]
  public async Task<IActionResult> Read(
    [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "reserve-canopy/{id}")] HttpRequest req,
    Guid id)
  {
    this.logger.LogInformation($"GET /api/reserve-canopy/{id}");
    var reserveCanopy = await Domains.ReserveCanopy.GetAsync(id);
    return new OkObjectResult(new ReserveCanopyResponse(reserveCanopy));
  }

  /// <summary>
  /// Update a reserve canopy.
  /// </summary>
  /// <param name="req">HTTP request.</param>
  /// <param name="id">Reserve canopy id.</param>
  /// <returns>HTTP response.</returns>
  [Function("ReserveCanopy_Update")]
  [OpenApiOperation(operationId: "ReserveCanopy_Update", tags: new[] { "reserve-canopy" })]
  [OpenApiParameter(name: "id", In = ParameterLocation.Path, Required = true, Type = typeof(Guid))]
  [OpenApiRequestBody(contentType: "application/json", bodyType: typeof(UpdateReserveCanopyRequest), Required = true)]
  [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "application/json", bodyType: typeof(ReserveCanopyResponse))]
  [OpenApiResponseWithBody(statusCode: HttpStatusCode.BadRequest, contentType: "application/json", bodyType: typeof(StandardErrorResponse))]
  [OpenApiResponseWithBody(statusCode: HttpStatusCode.NotFound, contentType: "application/json", bodyType: typeof(StandardErrorResponse))]
  public async Task<IActionResult> Update(
    [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "reserve-canopy/{id}")] HttpRequest req,
    Guid id)
  {
    this.logger.LogInformation($"POST  /api/reserve-canopy/{id}");
    var reserveCanopyRequest = await RequestBodyReader.ReadJsonBodyAsync<UpdateReserveCanopyRequest>(req.Body);
    var updatedReserveCanopy = await Domains.ReserveCanopy.UpdateAsync(id, reserveCanopyRequest);
    return new OkObjectResult(new ReserveCanopyResponse(updatedReserveCanopy));
  }

  /// <summary>
  /// Delete a reserve canopy.
  /// </summary>
  /// <param name="req">HTTP request.</param>
  /// <param name="id">Reserve canopy id.</param>
  /// <returns>HTTP response.</returns>
  [Function("ReserveCanopy_Delete")]
  [OpenApiOperation(operationId: "ReserveCanopy_Delete", tags: new[] { "reserve-canopy" })]
  [OpenApiParameter(name: "id", In = ParameterLocation.Path, Required = true, Type = typeof(Guid))]
  [OpenApiResponseWithoutBody(statusCode: HttpStatusCode.NoContent)]
  [OpenApiResponseWithBody(statusCode: HttpStatusCode.NotFound, contentType: "application/json", bodyType: typeof(StandardErrorResponse))]
  public async Task<IActionResult> Delete(
    [HttpTrigger(AuthorizationLevel.Anonymous, "delete", Route = "reserve-canopy/{id}")] HttpRequest req,
    Guid id)
  {
    this.logger.LogInformation($"DELETE /api/reserve-canopy/{id}");
    await Domains.ReserveCanopy.DeleteAsync(id);
    return new NoContentResult();
  }
}
