// RigSync | 20250527203455_InitialUserTable.cs

namespace Api.Migrations;

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

/// <inheritdoc />
public partial class InitialUserTable : Migration
{
  /// <inheritdoc />
  protected override void Up(MigrationBuilder migrationBuilder)
  {
    migrationBuilder.CreateTable(
        name: "Users",
        columns: table => new
        {
          Id = table.Column<int>(type: "int", nullable: false)
                .Annotation("SqlServer:Identity", "1, 1"),
          Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
        },
        constraints: table =>
        {
          table.PrimaryKey("PK_Users", x => x.Id);
        });
  }

  /// <inheritdoc />
  protected override void Down(MigrationBuilder migrationBuilder)
  {
    migrationBuilder.DropTable(
        name: "Users");
  }
}
