// RigSync | AADRequest.cs

namespace Api.Requests;

using Api.Requests.Shared;

/// <summary>
/// Create body for an AAD.
/// </summary>
public class CreateAADRequest : CreateKitRequest
{
  /// <summary>
  /// Gets the date when the next AAD service is due.
  /// </summary>
  public DateOnly? NextServiceDue { init; get; }

  /// <summary>
  /// Gets the expiry date of the AAD.
  /// </summary>
  public DateOnly? EndOfLife { init; get; }
}

/// <summary>
/// Update body for an AAD.
/// </summary>
public class UpdateAADRequest : UpdateKitRequest
{
  /// <summary>
  /// Gets the date when the next AAD service is due.
  /// </summary>
  public DateOnly? NextServiceDue { init; get; }

  /// <summary>
  /// Gets the expiry date of the AAD.
  /// </summary>
  public DateOnly? EndOfLife { init; get; }
}
