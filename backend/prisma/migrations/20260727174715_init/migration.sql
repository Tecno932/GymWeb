/*
  Warnings:

  - Added the required column `dueDate` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "dueDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "receiptNumber" TEXT;

-- CreateIndex
CREATE INDEX "Payment_dueDate_idx" ON "Payment"("dueDate");
