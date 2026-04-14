/*
  Warnings:

  - You are about to drop the column `foreignStudents` on the `Universities` table. All the data in the column will be lost.
  - Added the required column `foreign_students` to the `Universities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Universities" DROP COLUMN "foreignStudents",
ADD COLUMN     "foreign_students" TEXT NOT NULL;
