// RigSync | AAD.cs

namespace Api.Models;

using Api.Models.Shared;
using Api.Requests;

/// <summary>
/// Initializes a new instance of the <see cref="AAD"/> class.
/// </summary>
public class AAD : Kit
{
  /// <summary>
  /// Initializes a new instance of the <see cref="AAD"/> class.
  /// </summary>
  /// <param name="id">The GUID of the AAD.</param>
  /// <param name="manufacturer">The manufacturer of the AAD.</param>
  /// <param name="model">The model of the AAD.</param>
  /// <param name="ownerId">The ID of the owner of this AAD.</param>
  /// <param name="nextServiceDue">The date when the next AAD service is due.</param>
  /// <param name="endOfLife">The expiry date of the AAD.</param>
  public AAD(Guid id, string manufacturer, string model, string ownerId, DateOnly? nextServiceDue, DateOnly? endOfLife)
    : base(manufacturer, model, ownerId)
  {
    this.Id = id;
    this.NextServiceDue = nextServiceDue;
    this.EndOfLife = endOfLife;
  }

  /// <summary>
  /// Initializes a new instance of the <see cref="AAD"/> class from a CreateAADRequest.
  /// </summary>
  /// <param name="createRequest">The HTTP request body to create a new AAD.</param>
  /// <param name="owner">The owner of this AAD.</param>
  public AAD(CreateAADRequest createRequest, AuthProfile owner)
    : base(createRequest.Manufacturer, createRequest.Model, owner.Id)
  {
    this.Id = Guid.NewGuid();
    this.NextServiceDue = createRequest.NextServiceDue;
    this.EndOfLife = createRequest.EndOfLife;
  }

  /// <summary>
  /// Gets the AAD's id.
  /// </summary>
  public Guid Id { get; private set; }

  /// <summary>
  /// Gets or sets the date when the next AAD service is due.
  /// </summary>
  public DateOnly? NextServiceDue { get; set; }

  /// <summary>
  /// Gets or sets the expiry date of the AAD.
  /// </summary>
  public DateOnly? EndOfLife { get; set; }

  /// <summary>
  /// Gets or sets the rig that the AAD is part of.
  /// </summary>
  public Rig? Rig { get; set; }
}