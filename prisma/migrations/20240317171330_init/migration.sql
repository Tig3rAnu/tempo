/*
  Warnings:

  - You are about to alter the column `description` on the `VisaDetails` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(240)`.

*/
-- AlterTable
ALTER TABLE "VisaDetails" ALTER COLUMN "description" SET DATA TYPE VARCHAR(240);
