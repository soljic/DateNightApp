using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class notificationEntityUpdated : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_Activities_ActivityId",
                table: "Notifications");

            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_AspNetUsers_AuthorId",
                table: "Notifications");

            migrationBuilder.RenameColumn(
                name: "ActivityId",
                table: "Notifications",
                newName: "ReceieverId");

            migrationBuilder.RenameIndex(
                name: "IX_Notifications_ActivityId",
                table: "Notifications",
                newName: "IX_Notifications_ReceieverId");

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_AspNetUsers_AuthorId",
                table: "Notifications",
                column: "AuthorId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_AspNetUsers_ReceieverId",
                table: "Notifications",
                column: "ReceieverId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_AspNetUsers_AuthorId",
                table: "Notifications");

            migrationBuilder.DropForeignKey(
                name: "FK_Notifications_AspNetUsers_ReceieverId",
                table: "Notifications");

            migrationBuilder.RenameColumn(
                name: "ReceieverId",
                table: "Notifications",
                newName: "ActivityId");

            migrationBuilder.RenameIndex(
                name: "IX_Notifications_ReceieverId",
                table: "Notifications",
                newName: "IX_Notifications_ActivityId");

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_Activities_ActivityId",
                table: "Notifications",
                column: "ActivityId",
                principalTable: "Activities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Notifications_AspNetUsers_AuthorId",
                table: "Notifications",
                column: "AuthorId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
