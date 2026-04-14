/*
  Warnings:

  - You are about to drop the `Courses` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `LanguageCourse` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `PgCourse` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UgCourse` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Universities` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "CourseLevel" AS ENUM ('UG', 'PG', 'Language');

-- DropTable
DROP TABLE "Courses";

-- DropTable
DROP TABLE "LanguageCourse";

-- DropTable
DROP TABLE "PgCourse";

-- DropTable
DROP TABLE "UgCourse";

-- DropTable
DROP TABLE "Universities";

-- CreateTable
CREATE TABLE "University" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "total_course" TEXT NOT NULL,
    "hostel_fee" TEXT NOT NULL,
    "foreign_students" TEXT NOT NULL,
    "medical_insurance" TEXT NOT NULL,
    "notary" BOOLEAN NOT NULL DEFAULT false,
    "documents_required" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "University_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "fee" TEXT NOT NULL,
    "medium" TEXT NOT NULL,
    "level" "CourseLevel" NOT NULL,
    "accountKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BankDetails" (
    "id" TEXT NOT NULL,
    "universityId" TEXT NOT NULL,
    "bankName" TEXT NOT NULL,
    "accountNumber" TEXT NOT NULL,
    "tinNumber" TEXT NOT NULL,
    "bikNumber" TEXT NOT NULL,
    "corrospondant" TEXT NOT NULL,
    "trrcNumber" TEXT NOT NULL,

    CONSTRAINT "BankDetails_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "University_Course" (
    "universityId" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "University_Course_pkey" PRIMARY KEY ("universityId","courseId")
);

-- CreateTable
CREATE TABLE "_CourseToUniversity" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "BankDetails_universityId_key" ON "BankDetails"("universityId");

-- CreateIndex
CREATE UNIQUE INDEX "_CourseToUniversity_AB_unique" ON "_CourseToUniversity"("A", "B");

-- CreateIndex
CREATE INDEX "_CourseToUniversity_B_index" ON "_CourseToUniversity"("B");
