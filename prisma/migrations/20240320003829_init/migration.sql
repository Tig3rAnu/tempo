/*
  Warnings:

  - Added the required column `aboutCountry` to the `University` table without a default value. This is not possible if the table is not empty.
  - Added the required column `aboutHostels` to the `University` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cityWeather` to the `University` table without a default value. This is not possible if the table is not empty.
  - Added the required column `universityHistory` to the `University` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "University" ADD COLUMN     "aboutCountry" VARCHAR(250) NOT NULL,
ADD COLUMN     "aboutHostels" VARCHAR(250) NOT NULL,
ADD COLUMN     "cityWeather" VARCHAR(250) NOT NULL,
ADD COLUMN     "universityHistory" VARCHAR(250) NOT NULL;

-- CreateTable
CREATE TABLE "NotaryProviders" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "mobileNumber" TEXT NOT NULL,
    "firmName" TEXT NOT NULL,
    "address" VARCHAR(100),

    CONSTRAINT "NotaryProviders_pkey" PRIMARY KEY ("id")
);
