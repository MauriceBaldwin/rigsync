// RigSync | AAD.cs

namespace Api.Models;

using Api.Models.Shared;

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
  /// <param name="nextServiceDue">The date when the next AAD service is due.</param>
  /// <param name="endOfLife">The expiry date of the AAD.</param>
  public AAD(Guid id, string manufacturer, string model, DateOnly nextServiceDue, DateOnly endOfLife)
    : base(manufacturer, model)
  {
    this.Id = id;
    this.NextServiceDue = nextServiceDue;
    this.EndOfLife = endOfLife;
  }

  /// <summary>
  /// Initializes a new instance of the <see cref="AAD"/> class from a CreateAADRequest.
  /// </summary>
  /// <param name="createRequest">The HTTP request body to create a new AAD.</param>
  public AAD(Api.Requests.CreateAADRequest createRequest)
    : base(createRequest.Manufacturer, createRequest.Model)
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
  public DateOnly NextServiceDue { get; set; }

  /// <summary>
  /// Gets or sets the expiry date of the AAD.
  /// </summary>
  public DateOnly EndOfLife { get; set; }

  /// <summary>
  /// Gets or sets the rig that the AAD is part of.
  /// </summary>
  public Rig? Rig { get; set; }
}