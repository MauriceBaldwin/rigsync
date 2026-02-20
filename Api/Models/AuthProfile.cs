// RigSync | AuthProfile.cs

namespace Api.Models;

using Microsoft.AspNetCore.Http;
using System.IdentityModel.Tokens.Jwt;

/// <summary>
/// The authenticated user profile.
/// </summary>
public class AuthProfile
{
  /// <summary>
  /// Initializes a new instance of the <see cref="AuthProfile"/> class.
  /// </summary>
  /// <param name="req">HTTP request.</param>
  public AuthProfile(HttpRequest req)
  {
    var rawToken = req.Headers["X-ZUMO-AUTH"].ToString();
    var decodedToken = new JwtSecurityTokenHandler().ReadJwtToken(rawToken);

    this.Id = decodedToken.Payload.Sub;
  }

  /// <summary>
  /// Gets the ID of the user.
  /// </summary>
  public string Id { get; private set; }
}