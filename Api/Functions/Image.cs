// RigSync | Image.cs

namespace Api.Functions;

using System.Threading.Tasks;
using Azure.Storage.Blobs;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.Functions.Worker;
using Microsoft.Extensions.Logging;

/// <summary>
/// Retrieve an image from Azure Blob Storage.
/// </summary>
public class Image(ILogger<Image> logger)
{
  private readonly ILogger<Image> logger = logger;

  /// <summary>
  /// Retrieve an image.
  /// </summary>
  /// <param name="req">HTTP request.</param>
  /// <param name="filename">Requested file from blob storage.</param>
  /// <param name="blobClient">The client used to send requests to Azure Blob Storage.</param>
  /// <returns>HTTP response.</returns>
  [Function("Image")]
  public async Task Run(
    [HttpTrigger(AuthorizationLevel.Anonymous, "get", Route = "image/{filename}")] HttpRequest req,
    [FromRoute] string filename,
    [BlobInput("images/{filename}")] BlobClient blobClient)
  {
    this.logger.LogInformation($"GET /api/image/{filename}");

    byte[] blobImage;

    try
    {
      blobImage = (await blobClient.DownloadContentAsync()).Value.Content.ToArray();
    }
    catch (Azure.RequestFailedException e)
    {
      if (e.ErrorCode == "BlobNotFound")
      {
        throw new FileNotFoundException($"File {filename} does not exist in the blob storage.");
      }

      throw new Exception(e.ToString());
    }

    string imageType = filename.Substring(filename.LastIndexOf('.') + 1);

    // req.HttpContext.Response.StatusCode = (int)HttpStatusCode.OK;
    req.HttpContext.Response.Headers.Append("Content-Type", $"image/{imageType}");

    await req.HttpContext.Response.Body.WriteAsync(blobImage);
  }
}
