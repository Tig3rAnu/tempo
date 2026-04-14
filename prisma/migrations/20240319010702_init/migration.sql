-- CreateTable
CREATE TABLE "NotarizedDocuments" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "documents" TEXT[],
    "studentId" TEXT NOT NULL,

    CONSTRAINT "NotarizedDocuments_pkey" PRIMARY KEY ("id")
);
