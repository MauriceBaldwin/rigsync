// RigSync | 20260227202558_NullableRigReserveRepackDueDate.cs

namespace Api.Migrations;

using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

/// <inheritdoc />
public partial class NullableRigReserveRepackDueDate : Migration
{
  /// <inheritdoc />
  protected override void Up(MigrationBuilder migrationBuilder)
  {
    migrationBuilder.AlterColumn<DateOnly>(
        name: "NextReserveRepackDue",
        table: "Rigs",
        type: "date",
        nullable: true,
        oldClrType: typeof(DateOnly),
        oldType: "date");
  }

  /// <inheritdoc />
  protected override void Down(MigrationBuilder migrationBuilder)
  {
    migrationBuilder.AlterColumn<DateOnly>(
        name: "NextReserveRepackDue",
        table: "Rigs",
        type: "date",
        nullable: false,
        defaultValue: new DateOnly(1, 1, 1),
        oldClrType: typeof(DateOnly),
        oldType: "date",
        oldNullable: true);
  }
}
