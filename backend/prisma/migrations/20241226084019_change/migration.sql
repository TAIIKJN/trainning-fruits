/*
  Warnings:

  - You are about to drop the column `Freight` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `RequiredDate` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `ShipAddress` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `ShipCity` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `ShipCountry` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `ShipName` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `ShipPostalCode` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `ShipRegion` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `ShipVia` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `ShippedDate` on the `Order` table. All the data in the column will be lost.
  - Made the column `OrderDate` on table `Order` required. This step will fail if there are existing NULL values in that column.

*/
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
    "State" TEXT
);
INSERT INTO "new_Order" ("CustomerId", "EmployeeId", "Id", "OrderDate") SELECT "CustomerId", "EmployeeId", "Id", "OrderDate" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
