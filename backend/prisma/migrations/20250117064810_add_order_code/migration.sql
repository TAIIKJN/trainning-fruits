-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "Id" TEXT NOT NULL PRIMARY KEY,
    "OrderCode" TEXT NOT NULL DEFAULT 'D-000000000',
    "CustomerId" TEXT,
    "EmployeeId" TEXT NOT NULL,
    "OrderDate" TEXT NOT NULL,
    "TotalPrice" INTEGER,
    "State" TEXT DEFAULT 'Pending',
    "TypeService" TEXT NOT NULL DEFAULT 'Dine-in',
    "TableId" TEXT,
    CONSTRAINT "Order_CustomerId_fkey" FOREIGN KEY ("CustomerId") REFERENCES "Customer" ("Id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Order_EmployeeId_fkey" FOREIGN KEY ("EmployeeId") REFERENCES "Employee" ("Id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_TableId_fkey" FOREIGN KEY ("TableId") REFERENCES "Table" ("Id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("CustomerId", "EmployeeId", "Id", "OrderDate", "State", "TableId", "TotalPrice", "TypeService") SELECT "CustomerId", "EmployeeId", "Id", "OrderDate", "State", "TableId", "TotalPrice", "TypeService" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
