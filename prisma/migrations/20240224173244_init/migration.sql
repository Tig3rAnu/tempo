-- CreateTable
CREATE TABLE "UgCourse" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "fee" TEXT NOT NULL,
    "medium" TEXT NOT NULL,
    "ugCourseId" TEXT NOT NULL,

    CONSTRAINT "UgCourse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UgCourse_ugCourseId_key" ON "UgCourse"("ugCourseId");
