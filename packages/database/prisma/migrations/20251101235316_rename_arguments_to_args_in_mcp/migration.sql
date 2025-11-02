/*
  Warnings:

  - You are about to drop the column `arguments` on the `McpServer` table. All the data in the column will be lost.
  - Added the required column `args` to the `McpServer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "McpServer" DROP COLUMN "arguments",
ADD COLUMN     "args" TEXT NOT NULL;
