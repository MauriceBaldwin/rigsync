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
    var localConfig = new ConfigurationBuilder().AddJsonFile("local.settings.json").Build();

    var connectionString =
      localConfig.GetSection("Values").GetValue<string>("SqlConnectionString") ??
      Environment.GetEnvironmentVariable("SqlConnectionString");

    optionsBuilder.UseSqlServer(connectionString);
  }
}