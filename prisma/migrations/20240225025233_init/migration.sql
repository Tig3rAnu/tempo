/*
  Warnings:

  - You are about to drop the column `medicalCourseId` on the `PgCourse` table. All the data in the column will be lost.
  - You are about to drop the column `medicalCourseId` on the `UgCourse` table. All the data in the column will be lost.
  - You are about to drop the `MedicalCourse` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[courseId]` on the table `PgCourse` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[courseId]` on the table `UgCourse` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Courses` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseId` to the `PgCourse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseId` to the `UgCourse` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Courses_universitiesId_idx";

-- DropIndex
DROP INDEX "PgCourse_medicalCourseId_key";

-- DropIndex
DROP INDEX "UgCourse_medicalCourseId_key";

-- AlterTable
ALTER TABLE "Courses" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PgCourse" DROP COLUMN "medicalCourseId",
ADD COLUMN     "courseId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UgCourse" DROP COLUMN "medicalCourseId",
ADD COLUMN     "courseId" TEXT NOT NULL;

-- DropTable
DROP TABLE "MedicalCourse";

-- CreateIndex
CREATE UNIQUE INDEX "PgCourse_courseId_key" ON "PgCourse"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "UgCourse_courseId_key" ON "UgCourse"("courseId");
