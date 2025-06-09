// RigSync | MainCanopy.cs

namespace Api.Models;

using Api.Models.Shared;
using Api.Requests.MainCanopy;

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
  public MainCanopy(Guid id, string manufacturer, string model, int size)
  : base(manufacturer, model, size)
  {
    this.Id = id;
  }

  /// <summary>
  /// Initializes a new instance of the <see cref="MainCanopy"/> class.
  /// </summary>
  /// <param name="createRequest">The HTTP request body to create a new main canopy.</param>
  public MainCanopy(CreateRequest createRequest)
    : base(createRequest.Manufacturer, createRequest.Model, createRequest.Size)
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