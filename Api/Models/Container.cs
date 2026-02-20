// RigSync | Container.cs

namespace Api.Models;

using Api.Models.Shared;
using Api.Requests;

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
  /// <param name="ownerId">The ID of the user that owns this container.</param>
  public Container(Guid id, string manufacturer, string model, string ownerId)
    : base(manufacturer, model, ownerId)
  {
    this.Id = id;
  }

  /// <summary>
  /// Initializes a new instance of the <see cref="Container"/> class from a CreateContainerRequest.
  /// </summary>
  /// <param name="createRequest">The HTTP request body to create a new container.</param>
  /// <param name="owner">The owner of this container.</param>
  public Container(CreateContainerRequest createRequest, AuthProfile owner)
    : base(createRequest.Manufacturer, createRequest.Model, owner.Id)
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