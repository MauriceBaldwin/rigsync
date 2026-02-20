// RigSync | AAD.cs

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
/// CRUD operations for AADs.
/// </summary>
public class AAD(ILogger<AAD> logger)
{
  private readonly ILogger<AAD> logger = logger;

  /// <summary>
  /// List AADs.
  /// </summary>
  /// <param name="req">HTTP request.</param>
  /// <returns>HTTP response.</returns>
  [Function("AAD_List")]
  [OpenApiOperation(operationId: "AAD_List", tags: new[] { "aad" })]
  [OpenApiParameter(name: "page", In = ParameterLocation.Query, Type = typeof(int))]
  [OpenApiParameter(name: "limit", In = ParameterLocation.Query, Type = typeof(int))]
  [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "application/json", bodyType: typeof(AADsResponse))]
  public async Task<IActionResult> List(
    [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "aad")] HttpRequest req)
  {
    this.logger.LogInformation("GET /api/aad");
    var page = QueryParamReader.ReadPositiveNonZeroIntOrDefault(req, "page") ?? 1;
    var limit = QueryParamReader.ReadPositiveNonZeroIntOrDefault(req, "limit") ?? 10;
    var count = await Domains.AAD.CountAsync();
    var aads = await Domains.AAD.ListAsync(page, limit);
    return new OkObjectResult(new AADsResponse(aads, page, limit, count));
  }

  /// <summary>
  /// Create an AAD.
  /// </summary>
  /// <param name="req">HTTP request.</param>
  /// <returns>HTTP response.</returns>
  [Function("AAD_Create")]
  [OpenApiOperation(operationId: "AAD_Create", tags: new[] { "aad" })]
  [OpenApiRequestBody(contentType: "application/json", bodyType: typeof(CreateAADRequest), Required = true)]
  [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "application/json", bodyType: typeof(AADResponse))]
  [OpenApiResponseWithBody(statusCode: HttpStatusCode.BadRequest, contentType: "application/json", bodyType: typeof(StandardErrorResponse))]
  public async Task<IActionResult> Create(
    [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "aad")] HttpRequest req)
  {
    this.logger.LogInformation("POST /api/aad");
    var user = new AuthProfile(req);
    var aadRequest = await RequestBodyReader.ReadJsonBodyAsync<CreateAADRequest>(req.Body);
    var newAAD = await Domains.AAD.CreateAsync(aadRequest, user);
    return new OkObjectResult(new AADResponse(newAAD));
  }

  /// <summary>
  /// Read an AAD.
  /// </summary>
  /// <param name="req">HTTP request.</param>
  /// <param name="id">AAD id.</param>
  /// <returns>HTTP response.</returns>
  [Function("AAD_Read")]
  [OpenApiOperation(operationId: "AAD_Read", tags: new[] { "aad" })]
  [OpenApiParameter(name: "id", In = ParameterLocation.Path, Required = true, Type = typeof(Guid))]
  [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "application/json", bodyType: typeof(AADResponse))]
  [OpenApiResponseWithBody(statusCode: HttpStatusCode.NotFound, contentType: "application/json", bodyType: typeof(StandardErrorResponse))]
  public async Task<IActionResult> Read(
    [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "aad/{id}")] HttpRequest req,
    Guid id)
  {
    this.logger.LogInformation($"GET /api/aad/{id}");
    var aad = await Domains.AAD.GetAsync(id);
    return new OkObjectResult(new AADResponse(aad));
  }

  /// <summary>
  /// Update an AAD.
  /// </summary>
  /// <param name="req">HTTP request.</param>
  /// <param name="id">AAD id.</param>
  /// <returns>HTTP response.</returns>
  [Function("AAD_Update")]
  [OpenApiOperation(operationId: "AAD_Update", tags: new[] { "aad" })]
  [OpenApiParameter(name: "id", In = ParameterLocation.Path, Required = true, Type = typeof(Guid))]
  [OpenApiRequestBody(contentType: "application/json", bodyType: typeof(UpdateAADRequest), Required = true)]
  [OpenApiResponseWithBody(statusCode: HttpStatusCode.OK, contentType: "application/json", bodyType: typeof(AADResponse))]
  [OpenApiResponseWithBody(statusCode: HttpStatusCode.BadRequest, contentType: "application/json", bodyType: typeof(StandardErrorResponse))]
  [OpenApiResponseWithBody(statusCode: HttpStatusCode.NotFound, contentType: "application/json", bodyType: typeof(StandardErrorResponse))]
  public async Task<IActionResult> Update(
    [HttpTrigger(AuthorizationLevel.Anonymous, "post", Route = "aad/{id}")] HttpRequest req,
    Guid id)
  {
    this.logger.LogInformation($"POST  /api/aad/{id}");
    var aadRequest = await RequestBodyReader.ReadJsonBodyAsync<UpdateAADRequest>(req.Body);
    var updatedAAD = await Domains.AAD.UpdateAsync(id, aadRequest);
    return new OkObjectResult(new AADResponse(updatedAAD));
  }

  /// <summary>
  /// Delete an AAD.
  /// </summary>
  /// <param name="req">HTTP request.</param>
  /// <param name="id">AAD id.</param>
  /// <returns>HTTP response.</returns>
  [Function("AAD_Delete")]
  [OpenApiOperation(operationId: "AAD_Delete", tags: new[] { "aad" })]
  [OpenApiParameter(name: "id", In = ParameterLocation.Path, Required = true, Type = typeof(Guid))]
  [OpenApiResponseWithoutBody(statusCode: HttpStatusCode.NoContent)]
  [OpenApiResponseWithBody(statusCode: HttpStatusCode.NotFound, contentType: "application/json", bodyType: typeof(StandardErrorResponse))]
  public async Task<IActionResult> Delete(
    [HttpTrigger(AuthorizationLevel.Anonymous, "delete", Route = "aad/{id}")] HttpRequest req,
    Guid id)
  {
    this.logger.LogInformation($"DELETE /api/aad/{id}");
    await Domains.AAD.DeleteAsync(id);
    return new NoContentResult();
  }
}
