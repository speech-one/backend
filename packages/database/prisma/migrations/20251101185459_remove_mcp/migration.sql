/*
  Warnings:

  - You are about to drop the column `mcpId` on the `McpServer` table. All the data in the column will be lost.
  - You are about to drop the `Mcp` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,title]` on the table `McpServer` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `metadata` to the `McpServer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `McpServer` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Mcp" DROP CONSTRAINT "Mcp_userId_fkey";

-- DropForeignKey
ALTER TABLE "public"."McpServer" DROP CONSTRAINT "McpServer_mcpId_fkey";

-- DropIndex
DROP INDEX "public"."McpServer_mcpId_title_key";

-- AlterTable
ALTER TABLE "McpServer" DROP COLUMN "mcpId",
ADD COLUMN     "metadata" TEXT NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL;

-- DropTable
DROP TABLE "public"."Mcp";

-- CreateIndex
CREATE UNIQUE INDEX "McpServer_userId_title_key" ON "McpServer"("userId", "title");

-- AddForeignKey
ALTER TABLE "McpServer" ADD CONSTRAINT "McpServer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
