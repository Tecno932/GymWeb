/*
  Warnings:

  - Added the required column `updatedAt` to the `Membership` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Membership" ADD COLUMN     "observations" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
