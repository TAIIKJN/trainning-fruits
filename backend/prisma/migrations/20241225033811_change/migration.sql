-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Employee" (
    "Address" TEXT,
    "BirthDate" TEXT,
    "City" TEXT,
    "Country" TEXT,
    "Extension" TEXT,
    "FirstName" TEXT,
    "HireDate" TEXT,
    "HomePhone" TEXT,
    "Id" TEXT NOT NULL PRIMARY KEY,
    "LastName" TEXT,
    "Notes" TEXT,
    "Photo" TEXT,
    "PhotoPath" TEXT,
    "PostalCode" TEXT,
    "Region" TEXT,
    "ReportsTo" TEXT,
    "Title" TEXT,
    "TitleOfCourtesy" TEXT
);
INSERT INTO "new_Employee" ("Address", "BirthDate", "City", "Country", "Extension", "FirstName", "HireDate", "HomePhone", "Id", "LastName", "Notes", "Photo", "PhotoPath", "PostalCode", "Region", "ReportsTo", "Title", "TitleOfCourtesy") SELECT "Address", "BirthDate", "City", "Country", "Extension", "FirstName", "HireDate", "HomePhone", "Id", "LastName", "Notes", "Photo", "PhotoPath", "PostalCode", "Region", "ReportsTo", "Title", "TitleOfCourtesy" FROM "Employee";
DROP TABLE "Employee";
ALTER TABLE "new_Employee" RENAME TO "Employee";
CREATE TABLE "new_EmployeeTerritory" (
    "EmployeeId" TEXT NOT NULL,
    "Id" TEXT NOT NULL PRIMARY KEY,
    "TerritoryId" TEXT
);
INSERT INTO "new_EmployeeTerritory" ("EmployeeId", "Id", "TerritoryId") SELECT "EmployeeId", "Id", "TerritoryId" FROM "EmployeeTerritory";
DROP TABLE "EmployeeTerritory";
ALTER TABLE "new_EmployeeTerritory" RENAME TO "EmployeeTerritory";
CREATE TABLE "new_Order" (
    "CustomerId" TEXT,
    "EmployeeId" TEXT NOT NULL,
    "Freight" TEXT NOT NULL,
    "Id" TEXT NOT NULL PRIMARY KEY,
    "OrderDate" TEXT,
    "RequiredDate" TEXT,
    "ShipAddress" TEXT,
    "ShipCity" TEXT,
    "ShipCountry" TEXT,
    "ShipName" TEXT,
    "ShipPostalCode" TEXT,
    "ShipRegion" TEXT,
    "ShipVia" INTEGER,
    "ShippedDate" TEXT
);
INSERT INTO "new_Order" ("CustomerId", "EmployeeId", "Freight", "Id", "OrderDate", "RequiredDate", "ShipAddress", "ShipCity", "ShipCountry", "ShipName", "ShipPostalCode", "ShipRegion", "ShipVia", "ShippedDate") SELECT "CustomerId", "EmployeeId", "Freight", "Id", "OrderDate", "RequiredDate", "ShipAddress", "ShipCity", "ShipCountry", "ShipName", "ShipPostalCode", "ShipRegion", "ShipVia", "ShippedDate" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE TABLE "new_OrderDetail" (
    "Discount" REAL NOT NULL,
    "Id" TEXT NOT NULL PRIMARY KEY,
    "OrderId" TEXT NOT NULL,
    "ProductId" INTEGER NOT NULL,
    "Quantity" INTEGER NOT NULL,
    "UnitPrice" TEXT NOT NULL
);
INSERT INTO "new_OrderDetail" ("Discount", "Id", "OrderId", "ProductId", "Quantity", "UnitPrice") SELECT "Discount", "Id", "OrderId", "ProductId", "Quantity", "UnitPrice" FROM "OrderDetail";
DROP TABLE "OrderDetail";
ALTER TABLE "new_OrderDetail" RENAME TO "OrderDetail";
CREATE TABLE "new_Product" (
    "CategoryId" TEXT NOT NULL,
    "Discontinued" INTEGER NOT NULL,
    "Id" TEXT NOT NULL PRIMARY KEY,
    "ProductName" TEXT,
    "QuantityPerUnit" TEXT,
    "ReorderLevel" INTEGER NOT NULL,
    "SupplierId" TEXT NOT NULL,
    "UnitPrice" TEXT NOT NULL,
    "UnitsInStock" INTEGER NOT NULL,
    "UnitsOnOrder" INTEGER NOT NULL
);
INSERT INTO "new_Product" ("CategoryId", "Discontinued", "Id", "ProductName", "QuantityPerUnit", "ReorderLevel", "SupplierId", "UnitPrice", "UnitsInStock", "UnitsOnOrder") SELECT "CategoryId", "Discontinued", "Id", "ProductName", "QuantityPerUnit", "ReorderLevel", "SupplierId", "UnitPrice", "UnitsInStock", "UnitsOnOrder" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE TABLE "new_Territory" (
    "Id" TEXT NOT NULL PRIMARY KEY,
    "RegionId" TEXT NOT NULL,
    "TerritoryDescription" TEXT
);
INSERT INTO "new_Territory" ("Id", "RegionId", "TerritoryDescription") SELECT "Id", "RegionId", "TerritoryDescription" FROM "Territory";
DROP TABLE "Territory";
ALTER TABLE "new_Territory" RENAME TO "Territory";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
