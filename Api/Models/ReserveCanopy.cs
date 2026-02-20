// RigSync | ReserveCanopy.cs

namespace Api.Models;

using Api.Models.Shared;
using Api.Requests;

/// <summary>
/// Initializes a new instance of the <see cref="ReserveCanopy"/> class.
/// </summary>
public class ReserveCanopy : Canopy
{
  /// <summary>
  /// Initializes a new instance of the <see cref="ReserveCanopy"/> class.
  /// </summary>
  /// <param name="id">The GUID of the reserve canopy.</param>
  /// <param name="manufacturer">The manufacturer of the reserve canopy.</param>
  /// <param name="model">The model of the reserve canopy.</param>
  /// <param name="size">The size of the reserve canopy, in square feet.</param>
  /// <param name="ownerId">The ID of the user that owns this reserve canopy.</param>
  public ReserveCanopy(Guid id, string manufacturer, string model, int size, string ownerId)
    : base(manufacturer, model, size, ownerId)
  {
    this.Id = id;
  }

  /// <summary>
  /// Initializes a new instance of the <see cref="ReserveCanopy"/> class from a CreateReserveCanopyRequest.
  /// </summary>
  /// <param name="createRequest">The HTTP request body to create a new reserve canopy.</param>
  /// <param name="owner">The owner of this reserve canopy.</param>
  public ReserveCanopy(CreateReserveCanopyRequest createRequest, AuthProfile owner)
    : base(createRequest.Manufacturer, createRequest.Model, createRequest.Size, owner.Id)
  {
    this.Id = Guid.NewGuid();
  }

  /// <summary>
  /// Gets the reserve canopy's id.
  /// </summary>
  public Guid Id { get; private set; }

  /// <summary>
  /// Gets or sets the rig that the reserve canopy is part of.
  /// </summary>
  public Rig? Rig { get; set; }
}