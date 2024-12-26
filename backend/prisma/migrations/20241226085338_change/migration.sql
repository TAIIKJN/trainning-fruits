-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_OrderDetail" (
    "Discount" REAL NOT NULL,
    "Id" TEXT NOT NULL PRIMARY KEY,
    "ProductId" TEXT NOT NULL,
    "Quantity" INTEGER NOT NULL,
    "UnitPrice" TEXT NOT NULL,
    "OrderId" TEXT NOT NULL,
    CONSTRAINT "OrderDetail_ProductId_fkey" FOREIGN KEY ("ProductId") REFERENCES "Product" ("Id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "OrderDetail_OrderId_fkey" FOREIGN KEY ("OrderId") REFERENCES "Order" ("Id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_OrderDetail" ("Discount", "Id", "OrderId", "ProductId", "Quantity", "UnitPrice") SELECT "Discount", "Id", "OrderId", "ProductId", "Quantity", "UnitPrice" FROM "OrderDetail";
DROP TABLE "OrderDetail";
ALTER TABLE "new_OrderDetail" RENAME TO "OrderDetail";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
