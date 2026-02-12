// RigSync | Container.cs

namespace Api.Models;

using Api.Models.Shared;

/// <summary>
/// Initializes a new instance of the <see cref="Container"/> class.
/// </summary>
public class Container : Kit
{
  /// <summary>
  /// Initializes a new instance of the <see cref="Container"/> class.
  /// </summary>
  /// <param name="id">The GUID of the container.</param>
  /// <param name="manufacturer">The manufacturer of the container.</param>
  /// <param name="model">The model of the container.</param>
  public Container(Guid id, string manufacturer, string model)
    : base(manufacturer, model)
  {
    this.Id = id;
  }

  /// <summary>
  /// Initializes a new instance of the <see cref="Container"/> class from a CreateContainerRequest.
  /// </summary>
  /// <param name="createRequest">The HTTP request body to create a new container.</param>
  public Container(Api.Requests.CreateContainerRequest createRequest)
    : base(createRequest.Manufacturer, createRequest.Model)
  {
    this.Id = Guid.NewGuid();
  }

  /// <summary>
  /// Gets the container's id.
  /// </summary>
  public Guid Id { get; private set; }

  /// <summary>
  /// Gets or sets the rig that the container is part of.
  /// </summary>
  public Rig? Rig { get; set; }
}