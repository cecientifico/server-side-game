-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "userProviderID" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Adventure" (
    "id" SERIAL NOT NULL,
    "results" TEXT,
    "usersID" INTEGER,

    CONSTRAINT "Adventure_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Arcade" (
    "id" SERIAL NOT NULL,
    "results" TEXT,
    "usersID" INTEGER,

    CONSTRAINT "Arcade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Casually" (
    "id" SERIAL NOT NULL,
    "results" TEXT,
    "usersID" INTEGER,

    CONSTRAINT "Casually_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_userProviderID_key" ON "Users"("userProviderID");

-- AddForeignKey
ALTER TABLE "Adventure" ADD CONSTRAINT "Adventure_usersID_fkey" FOREIGN KEY ("usersID") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Arcade" ADD CONSTRAINT "Arcade_usersID_fkey" FOREIGN KEY ("usersID") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Casually" ADD CONSTRAINT "Casually_usersID_fkey" FOREIGN KEY ("usersID") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
