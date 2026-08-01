-- CreateEnum
CREATE TYPE "InvoiceStatus" AS ENUM ('PENDING', 'PAID', 'OVERDUE', 'CANCELLED');

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "invoiceId" TEXT;

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "membershipId" TEXT NOT NULL,
    "amount" DECIMAL(10,2) NOT NULL,
    "dueDate" TIMESTAMP(3) NOT NULL,
    "status" "InvoiceStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Invoice_membershipId_idx" ON "Invoice"("membershipId");

-- CreateIndex
CREATE INDEX "Invoice_status_idx" ON "Invoice"("status");

-- CreateIndex
CREATE INDEX "Invoice_dueDate_idx" ON "Invoice"("dueDate");

-- CreateIndex
CREATE INDEX "Payment_invoiceId_idx" ON "Payment"("invoiceId");

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_membershipId_fkey" FOREIGN KEY ("membershipId") REFERENCES "Membership"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_invoiceId_fkey" FOREIGN KEY ("invoiceId") REFERENCES "Invoice"("id") ON DELETE SET NULL ON UPDATE CASCADE;
