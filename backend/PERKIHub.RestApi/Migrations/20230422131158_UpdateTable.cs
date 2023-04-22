using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PERKIHub.RestApi.Migrations
{
    /// <inheritdoc />
    public partial class UpdateTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PH_ProfilePictureDef",
                columns: table => new
                {
                    ID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserID = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ContentType = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    File = table.Column<byte[]>(type: "varbinary(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PH_ProfilePictureDef", x => x.ID);
                    table.ForeignKey(
                        name: "FK_PH_ProfilePictureDef_PH_UserDef_UserID",
                        column: x => x.UserID,
                        principalTable: "PH_UserDef",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PH_ProfilePictureDef_UserID",
                table: "PH_ProfilePictureDef",
                column: "UserID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PH_ProfilePictureDef");
        }
    }
}
