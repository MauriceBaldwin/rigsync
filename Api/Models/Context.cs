// RigSync | Context.cs

namespace Api.Models;

using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

/// <summary>
/// The database context.
/// </summary>
public class Context : DbContext
{
  /// <summary>
  /// Gets or sets the main canopies.
  /// </summary>
  public DbSet<MainCanopy> MainCanopies { get; set; }

  /// <summary>
  /// Gets or sets the reserve canopies.
  /// </summary>
  public DbSet<ReserveCanopy> ReserveCanopies { get; set; }

  /// <summary>
  /// Gets or sets the containers.
  /// </summary>
  public DbSet<Container> Containers { get; set; }

  /// <summary>
  /// Gets or sets the AADs.
  /// </summary>
  public DbSet<AAD> AADs { get; set; }

  /// <summary>
  /// Gets or sets the main canopies.
  /// </summary>
  public DbSet<Rig> Rigs { get; set; }

  /// <summary>
  /// Configures the database connection.
  /// </summary>
  /// <param name="optionsBuilder">Configure the context options.</param>
  protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
  {
    string? connectionString;

    /*
      This is super hardcoded, but it allows use of the local.settings.json file
      to configure connection to the database for local development.
      The configuration should look like: {Values: {SqlConnectionString: xxx}}
    */
    const string configFilePath = "local.settings.json";
    if (File.Exists(configFilePath))
    {
      var config = new ConfigurationBuilder().AddJsonFile(configFilePath).Build();
      connectionString = config.GetSection("Values").GetValue<string>("SqlConnectionString");
    }

    /* If the above config file is not found, it will take the connection string
      from an environment variable called 'SqlConnectionString' */
    else
    {
      connectionString = Environment.GetEnvironmentVariable("SqlConnectionString");
    }

    optionsBuilder.UseSqlServer(connectionString, options => options.EnableRetryOnFailure());
  }

  /// <summary>
  /// Configure model creation.
  /// </summary>
  /// <param name="modelBuilder">The model builder.</param>
  protected override void OnModelCreating(ModelBuilder modelBuilder)
  {
    modelBuilder.Entity<MainCanopy>().Property(x => x.Id).HasDefaultValueSql("NEWID()");
    modelBuilder.Entity<ReserveCanopy>().Property(x => x.Id).HasDefaultValueSql("NEWID()");
    modelBuilder.Entity<Container>().Property(x => x.Id).HasDefaultValueSql("NEWID()");
    modelBuilder.Entity<AAD>().Property(x => x.Id).HasDefaultValueSql("NEWID()");
    modelBuilder.Entity<Rig>().Property(x => x.Id).HasDefaultValueSql("NEWID()");
  }
}