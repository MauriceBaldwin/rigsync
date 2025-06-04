// RigSync | QueryParamReader.cs

namespace Api.Functions.Utilities;

using Microsoft.AspNetCore.Http;

/// <summary>
/// Utilities for reading values from HTTP request query parameters.
/// </summary>
public static class QueryParamReader
{
  /// <summary>
  /// Utility for reading an integer value from a HTTP request query parameter.
  /// Returns null if the parameter is not found, or is not an integer.
  /// </summary>
  /// <param name="req">The HTTP request.</param>
  /// <param name="paramKey">The query parameter to read from.</param>
  /// <returns>The integer value read from the parameter.</returns>
  public static int? ReadIntOrDefault(HttpRequest req, string paramKey)
  {
    var param = req.Query[paramKey].FirstOrDefault();

    if (param == null)
    {
      return null;
    }

    try
    {
      return int.Parse(param);
    }
    catch (FormatException)
    {
      return null;
    }
  }

  /// <summary>
  /// Utility for reading a positive, non-zero integer value from a HTTP request
  /// query parameter.
  /// Returns null if the parameter is not found, or is not greater than 0.
  /// </summary>
  /// <param name="req">The HTTP request.</param>
  /// <param name="paramKey">The query parameter to read from.</param>
  /// <returns>The integer value read from the parameter.</returns>
  public static int? ReadPositiveNonZeroIntOrDefault(HttpRequest req, string paramKey)
  {
    var param = ReadIntOrDefault(req, paramKey);

    if (param == null || param <= 0)
    {
      return null;
    }

    return param;
  }
}