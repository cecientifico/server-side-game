-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "userProviderID" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Results" (
    "id" SERIAL NOT NULL,
    "results" TEXT,
    "usersId" INTEGER,

    CONSTRAINT "Results_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_userProviderID_key" ON "Users"("userProviderID");

-- AddForeignKey
ALTER TABLE "Results" ADD CONSTRAINT "Results_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
