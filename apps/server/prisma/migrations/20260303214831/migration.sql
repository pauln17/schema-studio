-- CreateTable
CREATE TABLE "schema" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "definition" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "schema_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "schema_token" (
    "id" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "schemaId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "schema_token_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "schema_token_tokenHash_key" ON "schema_token"("tokenHash");

-- AddForeignKey
ALTER TABLE "schema_token" ADD CONSTRAINT "schema_token_schemaId_fkey" FOREIGN KEY ("schemaId") REFERENCES "schema"("id") ON DELETE CASCADE ON UPDATE CASCADE;
