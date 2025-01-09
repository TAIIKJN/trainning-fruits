-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Supplier" (
    "Id" TEXT NOT NULL PRIMARY KEY,
    "Title" TEXT NOT NULL DEFAULT 'นาย',
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
INSERT INTO "new_Supplier" ("Address", "City", "Country", "Email", "FirstName", "Id", "LastName", "Notes", "Phone", "Photo", "PostalCode", "UserName") SELECT "Address", "City", "Country", "Email", "FirstName", "Id", "LastName", "Notes", "Phone", "Photo", "PostalCode", "UserName" FROM "Supplier";
DROP TABLE "Supplier";
ALTER TABLE "new_Supplier" RENAME TO "Supplier";
CREATE UNIQUE INDEX "Supplier_Email_key" ON "Supplier"("Email");
CREATE UNIQUE INDEX "Supplier_UserName_key" ON "Supplier"("UserName");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
