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
  /// Gets or sets the users.
  /// </summary>
  public DbSet<User> Users { get; set; }

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
}