-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "CustomerId" TEXT,
    "EmployeeId" TEXT NOT NULL,
    "OrderDate" TEXT NOT NULL,
    "Id" TEXT NOT NULL PRIMARY KEY,
    "TotalPrice" INTEGER,
    "Address" TEXT,
    "State" TEXT,
    CONSTRAINT "Order_CustomerId_fkey" FOREIGN KEY ("CustomerId") REFERENCES "Customer" ("Id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Order_EmployeeId_fkey" FOREIGN KEY ("EmployeeId") REFERENCES "Employee" ("Id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("Address", "CustomerId", "EmployeeId", "Id", "OrderDate", "State", "TotalPrice") SELECT "Address", "CustomerId", "EmployeeId", "Id", "OrderDate", "State", "TotalPrice" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
