/*
  Warnings:

  - Added the required column `city` to the `Universities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Universities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `foreignStudents` to the `Universities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hostelFee` to the `Universities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `notary` to the `Universities` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalCourse` to the `Universities` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `Universities` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Universities" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "documentsRequired" TEXT[],
ADD COLUMN     "foreignStudents" TEXT NOT NULL,
ADD COLUMN     "hostelFee" TEXT NOT NULL,
ADD COLUMN     "notary" BOOLEAN NOT NULL,
ADD COLUMN     "totalCourse" TEXT NOT NULL,
ALTER COLUMN "name" SET NOT NULL;
