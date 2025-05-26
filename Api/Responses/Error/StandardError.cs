// RigSync | StandardError.cs

namespace Api.Responses.Error;

/// <summary>
/// A standardised format for error responses returned by the application.
/// </summary>
/// <remarks>
/// Initializes a new instance of the <see cref="StandardError"/> class.
/// </remarks>
/// <param name="errorCode">The error code.</param>
/// <param name="message">The error message.</param>
public class StandardError(ErrorCode errorCode, string message)
{
  /// <summary>
  /// Gets: A code that identifies the type of error that occurred.
  /// </summary>
  public string ErrorCode { get; private set; } = errorCode.Value;

  /// <summary>
  /// Gets: A meaningful error message for the user.
  /// </summary>
  public string Message { get; private set; } = message;
}