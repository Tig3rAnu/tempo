/*
  Warnings:

  - You are about to drop the column `medicalId` on the `MedicalCourse` table. All the data in the column will be lost.
  - You are about to drop the column `pgCourseId` on the `PgCourse` table. All the data in the column will be lost.
  - You are about to drop the column `ugCourseId` on the `UgCourse` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[courseId]` on the table `MedicalCourse` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[medicalCourseId]` on the table `PgCourse` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[medicalCourseId]` on the table `UgCourse` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `courseId` to the `MedicalCourse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `medicalCourseId` to the `PgCourse` table without a default value. This is not possible if the table is not empty.
  - Added the required column `medicalCourseId` to the `UgCourse` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "MedicalCourse_medicalId_key";

-- DropIndex
DROP INDEX "PgCourse_pgCourseId_key";

-- DropIndex
DROP INDEX "UgCourse_ugCourseId_key";

-- AlterTable
ALTER TABLE "MedicalCourse" DROP COLUMN "medicalId",
ADD COLUMN     "courseId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "PgCourse" DROP COLUMN "pgCourseId",
ADD COLUMN     "medicalCourseId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UgCourse" DROP COLUMN "ugCourseId",
ADD COLUMN     "medicalCourseId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Courses_universitiesId_idx" ON "Courses"("universitiesId");

-- CreateIndex
CREATE UNIQUE INDEX "MedicalCourse_courseId_key" ON "MedicalCourse"("courseId");

-- CreateIndex
CREATE INDEX "MedicalCourse_courseId_idx" ON "MedicalCourse"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "PgCourse_medicalCourseId_key" ON "PgCourse"("medicalCourseId");

-- CreateIndex
CREATE UNIQUE INDEX "UgCourse_medicalCourseId_key" ON "UgCourse"("medicalCourseId");
