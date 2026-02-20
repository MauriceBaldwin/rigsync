// RigSync | MainCanopy.cs

namespace Api.Models;

using Api.Models.Shared;
using Api.Requests;

/// <summary>
/// DBO for a Main Canopy.
/// </summary>
public class MainCanopy : Canopy
{
  /// <summary>
  /// Initializes a new instance of the <see cref="MainCanopy"/> class.
  /// </summary>
  /// <param name="id">The GUID of the main canopy.</param>
  /// <param name="manufacturer">The manufacturer of the main canopy.</param>
  /// <param name="model">The model of the main canopy.</param>
  /// <param name="size">The size of the main canopy, in square feet.</param>
  /// <param name="ownerId">The ID of the user that owns this main canopy.</param>
  public MainCanopy(Guid id, string manufacturer, string model, int size, string ownerId)
  : base(manufacturer, model, size, ownerId)
  {
    this.Id = id;
  }

  /// <summary>
  /// Initializes a new instance of the <see cref="MainCanopy"/> class.
  /// </summary>
  /// <param name="createRequest">The HTTP request body to create a new main canopy.</param>
  /// <param name="owner">The owner of this main canopy.</param>
  public MainCanopy(CreateMainCanopyRequest createRequest, AuthProfile owner)
    : base(createRequest.Manufacturer, createRequest.Model, createRequest.Size, owner.Id)
  {
  }

  /// <summary>
  /// Gets the main canopy's id.
  /// </summary>
  public Guid Id { get; private set; }

  /// <summary>
  /// Gets or sets the rig that the main canopy is part of.
  /// </summary>
  public Rig? Rig { get; set; }
}