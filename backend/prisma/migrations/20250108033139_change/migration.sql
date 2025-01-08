/*
  Warnings:

  - A unique constraint covering the columns `[Email]` on the table `Supplier` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[UserName]` on the table `Supplier` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Supplier_Email_key" ON "Supplier"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "Supplier_UserName_key" ON "Supplier"("UserName");
