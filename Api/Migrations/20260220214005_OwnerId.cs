// RigSync | 20260220214005_OwnerId.cs

namespace Api.Migrations;

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

/// <inheritdoc />
public partial class OwnerId : Migration
{
  /// <inheritdoc />
  protected override void Up(MigrationBuilder migrationBuilder)
  {
    migrationBuilder.AddColumn<string>(
        name: "OwnerId",
        table: "Rigs",
        type: "nvarchar(max)",
        nullable: false);

    migrationBuilder.AddColumn<string>(
        name: "OwnerId",
        table: "ReserveCanopies",
        type: "nvarchar(max)",
        nullable: false);

    migrationBuilder.AddColumn<string>(
        name: "OwnerId",
        table: "MainCanopies",
        type: "nvarchar(max)",
        nullable: false);

    migrationBuilder.AddColumn<string>(
        name: "OwnerId",
        table: "Containers",
        type: "nvarchar(max)",
        nullable: false);

    migrationBuilder.AddColumn<string>(
        name: "OwnerId",
        table: "AADs",
        type: "nvarchar(max)",
        nullable: false);
  }

  /// <inheritdoc />
  protected override void Down(MigrationBuilder migrationBuilder)
  {
    migrationBuilder.DropColumn(
        name: "OwnerId",
        table: "Rigs");

    migrationBuilder.DropColumn(
        name: "OwnerId",
        table: "ReserveCanopies");

    migrationBuilder.DropColumn(
        name: "OwnerId",
        table: "MainCanopies");

    migrationBuilder.DropColumn(
        name: "OwnerId",
        table: "Containers");

    migrationBuilder.DropColumn(
        name: "OwnerId",
        table: "AADs");
  }
}
