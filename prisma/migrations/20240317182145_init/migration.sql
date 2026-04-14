/*
  Warnings:

  - Added the required column `updatedAt` to the `Agent` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `BankDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `SubscriptionPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `VisaDetails` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Agent" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "BankDetails" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "agentId" TEXT,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "SubscriptionPlan" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "VisaDetails" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "Application" (
    "id" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT,
    "university" TEXT NOT NULL,
    "course" TEXT NOT NULL,
    "medium" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "fatherName" TEXT NOT NULL,
    "motherName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "citizen" TEXT NOT NULL,
    "zipCode" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "passportNumber" TEXT NOT NULL,
    "secoundaryBoard" TEXT NOT NULL,
    "secoundaryGrades" TEXT NOT NULL,
    "higherSecondaryBoard" TEXT NOT NULL,
    "stream" TEXT NOT NULL,
    "higherSecondaryGrades" TEXT NOT NULL,
    "universityName" TEXT NOT NULL,
    "degree" TEXT NOT NULL,
    "grades" TEXT NOT NULL,
    "documents" TEXT[],
    "studentId" TEXT,
    "agentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Application_email_key" ON "Application"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Application_mobileNumber_key" ON "Application"("mobileNumber");
