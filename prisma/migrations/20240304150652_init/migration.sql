/*
  Warnings:

  - You are about to drop the column `agentIdProof` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `companyName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `companyRegistration` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `dob` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `fatherName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `gstNumber` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `passportNumber` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `subscriptionPlanId` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "User_companyName_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "agentIdProof",
DROP COLUMN "companyName",
DROP COLUMN "companyRegistration",
DROP COLUMN "dob",
DROP COLUMN "fatherName",
DROP COLUMN "gstNumber",
DROP COLUMN "passportNumber",
DROP COLUMN "subscriptionPlanId";

-- CreateTable
CREATE TABLE "Agent" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "companyName" TEXT,
    "gstNumber" TEXT,
    "companyRegistration" TEXT,
    "agentIdProof" TEXT,
    "role" "UserRole" NOT NULL,
    "subscriptionPlanId" TEXT,

    CONSTRAINT "Agent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "fatherName" TEXT,
    "passportNumber" TEXT,
    "dob" TIMESTAMP(3),
    "role" "UserRole" NOT NULL,
    "subscriptionPlanId" TEXT,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Agent_username_key" ON "Agent"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Agent_email_key" ON "Agent"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Agent_mobileNumber_key" ON "Agent"("mobileNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Agent_companyName_key" ON "Agent"("companyName");

-- CreateIndex
CREATE UNIQUE INDEX "Student_username_key" ON "Student"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Student_mobileNumber_key" ON "Student"("mobileNumber");
