/*
  Warnings:

  - You are about to drop the column `CompanyName` on the `Supplier` table. All the data in the column will be lost.
  - You are about to drop the column `ContactName` on the `Supplier` table. All the data in the column will be lost.
  - You are about to drop the column `ContactTitle` on the `Supplier` table. All the data in the column will be lost.
  - You are about to drop the column `Fax` on the `Supplier` table. All the data in the column will be lost.
  - You are about to drop the column `HomePage` on the `Supplier` table. All the data in the column will be lost.
  - You are about to drop the column `Region` on the `Supplier` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Supplier" (
    "Id" TEXT NOT NULL PRIMARY KEY,
    "Name" TEXT NOT NULL DEFAULT 'test',
    "Email" TEXT NOT NULL DEFAULT 'test@test.com',
    "UserName" TEXT NOT NULL DEFAULT 'test',
    "Phone" TEXT,
    "Address" TEXT,
    "City" TEXT,
    "Country" TEXT,
    "PostalCode" TEXT,
    "Notes" TEXT,
    "Photo" TEXT
);
INSERT INTO "new_Supplier" ("Address", "City", "Country", "Id", "Phone", "PostalCode") SELECT "Address", "City", "Country", "Id", "Phone", "PostalCode" FROM "Supplier";
DROP TABLE "Supplier";
ALTER TABLE "new_Supplier" RENAME TO "Supplier";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
