// RigSync | ReserveCanopy.cs

namespace Api.Models;

using Api.Models.Shared;

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
  public ReserveCanopy(Guid id, string manufacturer, string model, int size)
    : base(manufacturer, model, size)
  {
    this.Id = id;
  }

  /// <summary>
  /// Initializes a new instance of the <see cref="ReserveCanopy"/> class from a CreateReserveCanopyRequest.
  /// </summary>
  /// <param name="createRequest">The HTTP request body to create a new reserve canopy.</param>
  public ReserveCanopy(Api.Requests.CreateReserveCanopyRequest createRequest)
    : base(createRequest.Manufacturer, createRequest.Model, createRequest.Size)
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