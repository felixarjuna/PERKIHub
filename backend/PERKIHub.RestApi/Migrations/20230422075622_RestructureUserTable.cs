using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PERKIHub.RestApi.Migrations
{
    /// <inheritdoc />
    public partial class RestructureUserTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ProfilePicture",
                table: "PH_UserDef");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<byte[]>(
                name: "ProfilePicture",
                table: "PH_UserDef",
                type: "BLOB",
                nullable: true);
        }
    }
}
