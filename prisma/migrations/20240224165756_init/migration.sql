/*
  Warnings:

  - The primary key for the `Universities` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `medical_insurance` to the `Universities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `universityId` to the `Universities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Universities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Universities" DROP CONSTRAINT "Universities_pkey",
ADD COLUMN     "bank_details" TEXT[],
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "medical_insurance" TEXT NOT NULL,
ADD COLUMN     "universityId" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Universities_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Universities_id_seq";
