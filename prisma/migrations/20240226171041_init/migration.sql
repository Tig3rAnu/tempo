-- AlterTable
ALTER TABLE "Universities" ALTER COLUMN "notary" SET DEFAULT false;

-- CreateTable
CREATE TABLE "LanguageCourse" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "fee" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "LanguageCourse_pkey" PRIMARY KEY ("id")
);
