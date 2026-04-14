/*
  Warnings:

  - You are about to drop the column `universitiesId` on the `LanguageCourse` table. All the data in the column will be lost.
  - Added the required column `accountKey` to the `Courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseId` to the `LanguageCourse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Courses" ADD COLUMN     "accountKey" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "LanguageCourse" DROP COLUMN "universitiesId",
ADD COLUMN     "courseId" TEXT NOT NULL;
