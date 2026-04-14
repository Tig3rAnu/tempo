/*
  Warnings:

  - You are about to drop the column `courseId` on the `LanguageCourse` table. All the data in the column will be lost.
  - Added the required column `universitiesId` to the `LanguageCourse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "LanguageCourse" DROP COLUMN "courseId",
ADD COLUMN     "universitiesId" TEXT NOT NULL;
