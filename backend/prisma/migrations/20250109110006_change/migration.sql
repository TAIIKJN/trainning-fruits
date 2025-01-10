/*
  Warnings:

  - You are about to alter the column `Discontinued` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Boolean`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "CategoryId" TEXT NOT NULL,
    "Discontinued" BOOLEAN NOT NULL DEFAULT true,
    "Id" TEXT NOT NULL PRIMARY KEY,
    "ProductName" TEXT,
    "QuantityPerUnit" TEXT,
    "ReorderLevel" INTEGER NOT NULL,
    "SupplierId" TEXT,
    "UnitPrice" TEXT NOT NULL,
    "UnitsInStock" INTEGER NOT NULL,
    "UnitsOnOrder" INTEGER NOT NULL,
    CONSTRAINT "Product_CategoryId_fkey" FOREIGN KEY ("CategoryId") REFERENCES "Category" ("Id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Product_SupplierId_fkey" FOREIGN KEY ("SupplierId") REFERENCES "Supplier" ("Id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Product" ("CategoryId", "Discontinued", "Id", "ProductName", "QuantityPerUnit", "ReorderLevel", "SupplierId", "UnitPrice", "UnitsInStock", "UnitsOnOrder") SELECT "CategoryId", "Discontinued", "Id", "ProductName", "QuantityPerUnit", "ReorderLevel", "SupplierId", "UnitPrice", "UnitsInStock", "UnitsOnOrder" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
