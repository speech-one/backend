-- CreateTable
CREATE TABLE "BasePrompt" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "prompt" TEXT NOT NULL,

    CONSTRAINT "BasePrompt_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BasePrompt" ADD CONSTRAINT "BasePrompt_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
