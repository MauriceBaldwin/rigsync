// RigSync | ErrorCode.cs

namespace Api.Responses.Error;

/// <summary>
/// Predefined error codes.
/// </summary>
public class ErrorCode(string value)
{
  /// <summary>
  /// Gets: An ErrorCode to represent that the requested resource does not exist.
  /// </summary>
  public static ErrorCode NotFound
  {
    get { return new ErrorCode("NOT_FOUND"); }
  }

  /// <summary>
  /// Gets: An ErrorCode to represent an error caused by the user passing
  /// invalid data through the request body.
  /// </summary>
  public static ErrorCode InvalidRequestBody
  {
    get { return new ErrorCode("INVALID_REQUEST_BODY"); }
  }

  /// <summary>
  /// Gets: An ErrorCode to represent an error caused by the function not being
  /// implemented.
  /// </summary>
  public static ErrorCode NotImplemented
  {
    get { return new ErrorCode("NOT_IMPLEMENTED"); }
  }

  /// <summary>
  /// Gets: An ErrorCode to represent an error caused by an unhandled exception.
  /// </summary>
  public static ErrorCode UnhandledException
  {
    get { return new ErrorCode("UNHANDLED_EXCEPTION"); }
  }

  /// <summary>
  /// Gets: The error code string.
  /// </summary>
  public string Value { get; private set; } = value;

  /// <summary>
  /// Represent the ErrorCode as a string.
  /// </summary>
  /// <returns>The error code.</returns>
  public override string ToString()
  {
    return this.Value;
  }
}