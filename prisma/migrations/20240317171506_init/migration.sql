/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `VisaDetails` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "VisaDetails_email_key" ON "VisaDetails"("email");
