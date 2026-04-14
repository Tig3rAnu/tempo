-- CreateTable
CREATE TABLE "PgCourse" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "fee" TEXT NOT NULL,
    "medium" TEXT NOT NULL,
    "pgCourseId" TEXT NOT NULL,

    CONSTRAINT "PgCourse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PgCourse_pgCourseId_key" ON "PgCourse"("pgCourseId");
