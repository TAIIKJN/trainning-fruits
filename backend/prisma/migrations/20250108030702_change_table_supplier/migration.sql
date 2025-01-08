/*
  Warnings:

  - You are about to drop the column `Name` on the `Supplier` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Supplier" (
    "Id" TEXT NOT NULL PRIMARY KEY,
    "FirstName" TEXT NOT NULL DEFAULT 'test',
    "LastName" TEXT,
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
INSERT INTO "new_Supplier" ("Address", "City", "Country", "Email", "Id", "Notes", "Phone", "Photo", "PostalCode", "UserName") SELECT "Address", "City", "Country", "Email", "Id", "Notes", "Phone", "Photo", "PostalCode", "UserName" FROM "Supplier";
DROP TABLE "Supplier";
ALTER TABLE "new_Supplier" RENAME TO "Supplier";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
