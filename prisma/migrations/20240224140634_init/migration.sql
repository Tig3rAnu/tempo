/*
  Warnings:

  - You are about to drop the column `hostelFee` on the `Universities` table. All the data in the column will be lost.
  - Added the required column `hostel_fee` to the `Universities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Universities" DROP COLUMN "hostelFee",
ADD COLUMN     "hostel_fee" TEXT NOT NULL;
