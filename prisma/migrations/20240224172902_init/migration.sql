-- CreateTable
CREATE TABLE "MedicalCourse" (
    "id" TEXT NOT NULL,
    "medicalId" TEXT NOT NULL,

    CONSTRAINT "MedicalCourse_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MedicalCourse_medicalId_key" ON "MedicalCourse"("medicalId");
