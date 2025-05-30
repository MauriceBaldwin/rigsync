// RigSync | 20250530212113_InitialMigration.cs

namespace Api.Migrations;

using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

/// <inheritdoc />
public partial class InitialMigration : Migration
{
  /// <inheritdoc />
  protected override void Up(MigrationBuilder migrationBuilder)
  {
    migrationBuilder.CreateTable(
        name: "AADs",
        columns: table => new
        {
          Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWID()"),
          NextServiceDue = table.Column<DateOnly>(type: "date", nullable: false),
          EndOfLife = table.Column<DateOnly>(type: "date", nullable: false),
          Manufacturer = table.Column<string>(type: "nvarchar(max)", nullable: false),
          Model = table.Column<string>(type: "nvarchar(max)", nullable: false),
          Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
        },
        constraints: table =>
        {
          table.PrimaryKey("PK_AADs", x => x.Id);
        });

    migrationBuilder.CreateTable(
        name: "Containers",
        columns: table => new
        {
          Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWID()"),
          Manufacturer = table.Column<string>(type: "nvarchar(max)", nullable: false),
          Model = table.Column<string>(type: "nvarchar(max)", nullable: false),
          Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
        },
        constraints: table =>
        {
          table.PrimaryKey("PK_Containers", x => x.Id);
        });

    migrationBuilder.CreateTable(
        name: "MainCanopies",
        columns: table => new
        {
          Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWID()"),
          Manufacturer = table.Column<string>(type: "nvarchar(max)", nullable: false),
          Model = table.Column<string>(type: "nvarchar(max)", nullable: false),
          Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
          Size = table.Column<int>(type: "int", nullable: false),
        },
        constraints: table =>
        {
          table.PrimaryKey("PK_MainCanopies", x => x.Id);
        });

    migrationBuilder.CreateTable(
        name: "ReserveCanopies",
        columns: table => new
        {
          Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWID()"),
          Manufacturer = table.Column<string>(type: "nvarchar(max)", nullable: false),
          Model = table.Column<string>(type: "nvarchar(max)", nullable: false),
          Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
          Size = table.Column<int>(type: "int", nullable: false),
        },
        constraints: table =>
        {
          table.PrimaryKey("PK_ReserveCanopies", x => x.Id);
        });

    migrationBuilder.CreateTable(
        name: "Rigs",
        columns: table => new
        {
          Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false, defaultValueSql: "NEWID()"),
          NextReserveRepackDue = table.Column<DateOnly>(type: "date", nullable: false),
          MainCanopyId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
          ReserveCanopyId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
          ContainerId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
          AADId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
        },
        constraints: table =>
        {
          table.PrimaryKey("PK_Rigs", x => x.Id);
          table.ForeignKey(
                      name: "FK_Rigs_AADs_AADId",
                      column: x => x.AADId,
                      principalTable: "AADs",
                      principalColumn: "Id",
                      onDelete: ReferentialAction.Cascade);
          table.ForeignKey(
                      name: "FK_Rigs_Containers_ContainerId",
                      column: x => x.ContainerId,
                      principalTable: "Containers",
                      principalColumn: "Id",
                      onDelete: ReferentialAction.Cascade);
          table.ForeignKey(
                      name: "FK_Rigs_MainCanopies_MainCanopyId",
                      column: x => x.MainCanopyId,
                      principalTable: "MainCanopies",
                      principalColumn: "Id",
                      onDelete: ReferentialAction.Cascade);
          table.ForeignKey(
                      name: "FK_Rigs_ReserveCanopies_ReserveCanopyId",
                      column: x => x.ReserveCanopyId,
                      principalTable: "ReserveCanopies",
                      principalColumn: "Id",
                      onDelete: ReferentialAction.Cascade);
        });

    migrationBuilder.CreateIndex(
        name: "IX_Rigs_AADId",
        table: "Rigs",
        column: "AADId",
        unique: true);

    migrationBuilder.CreateIndex(
        name: "IX_Rigs_ContainerId",
        table: "Rigs",
        column: "ContainerId",
        unique: true);

    migrationBuilder.CreateIndex(
        name: "IX_Rigs_MainCanopyId",
        table: "Rigs",
        column: "MainCanopyId",
        unique: true);

    migrationBuilder.CreateIndex(
        name: "IX_Rigs_ReserveCanopyId",
        table: "Rigs",
        column: "ReserveCanopyId",
        unique: true);
  }

  /// <inheritdoc />
  protected override void Down(MigrationBuilder migrationBuilder)
  {
    migrationBuilder.DropTable(
        name: "Rigs");

    migrationBuilder.DropTable(
        name: "AADs");

    migrationBuilder.DropTable(
        name: "Containers");

    migrationBuilder.DropTable(
        name: "MainCanopies");

    migrationBuilder.DropTable(
        name: "ReserveCanopies");
  }
}
