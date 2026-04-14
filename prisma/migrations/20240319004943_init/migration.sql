/*
  Warnings:

  - You are about to drop the column `name` on the `SubscriptionPlan` table. All the data in the column will be lost.
  - Added the required column `paymentId` to the `SubscriptionPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `plan` to the `SubscriptionPlan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `SubscriptionPlan` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SubscriptionPlanType" AS ENUM ('BASIC', 'PREMIUM', 'AGENT');

-- CreateEnum
CREATE TYPE "SubscriptionPlanStatus" AS ENUM ('ACTIVE', 'EXPIRED');

-- AlterTable
ALTER TABLE "Agent" ALTER COLUMN "role" SET DEFAULT 'AGENT';

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "role" SET DEFAULT 'STUDENT';

-- AlterTable
ALTER TABLE "SubscriptionPlan" DROP COLUMN "name",
ADD COLUMN     "paymentId" TEXT NOT NULL,
ADD COLUMN     "plan" "SubscriptionPlanType" NOT NULL,
ADD COLUMN     "status" "SubscriptionPlanStatus" NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'ADMIN';
