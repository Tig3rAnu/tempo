/*
  Warnings:

  - Made the column `companyName` on table `Agent` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Agent" ALTER COLUMN "companyName" SET NOT NULL;
