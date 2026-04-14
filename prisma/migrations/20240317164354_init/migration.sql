-- CreateTable
CREATE TABLE "VisaDetails" (
    "id" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "helplineNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "universityName" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "VisaDetails_pkey" PRIMARY KEY ("id")
);
