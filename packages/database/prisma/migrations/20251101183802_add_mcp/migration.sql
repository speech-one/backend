-- CreateTable
CREATE TABLE "Mcp" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "json" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Mcp_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "McpServer" (
    "id" TEXT NOT NULL,
    "mcpId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "arguments" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "McpServer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "McpServer_mcpId_title_key" ON "McpServer"("mcpId", "title");

-- AddForeignKey
ALTER TABLE "Mcp" ADD CONSTRAINT "Mcp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "McpServer" ADD CONSTRAINT "McpServer_mcpId_fkey" FOREIGN KEY ("mcpId") REFERENCES "Mcp"("id") ON DELETE CASCADE ON UPDATE CASCADE;
