-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('SUPERADMIN', 'ADMIN', 'AGENT', 'STUDENT');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "companyName" TEXT NOT NULL,
    "gstNumber" TEXT NOT NULL,
    "companyRegistration" TEXT NOT NULL,
    "agentIdProof" TEXT NOT NULL,
    "fatherName" TEXT NOT NULL,
    "passportNumber" TEXT NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "subscriptionPlanId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubscriptionPlan" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "SubscriptionPlan_pkey" PRIMARY KEY ("id")
);
