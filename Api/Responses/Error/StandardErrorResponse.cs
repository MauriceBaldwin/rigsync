// RigSync | StandardErrorResponse.cs

namespace Api.Responses.Error;

using System.ComponentModel.DataAnnotations;

/// <summary>
/// A standardised format for error responses returned by the application.
/// </summary>
/// <param name="errorCode">The error code.</param>
/// <param name="message">The error message.</param>
public class StandardErrorResponse(ErrorCode errorCode, string message)
{
  /// <summary>
  /// Gets: A code that identifies the type of error that occurred.
  /// </summary>
  [Required]
  public string ErrorCode { get; private set; } = errorCode.Value;

  /// <summary>
  /// Gets: A meaningful error message for the user.
  /// </summary>
  [Required]
  public string Message { get; private set; } = message;
}