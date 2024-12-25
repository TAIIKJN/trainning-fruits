-- CreateTable
CREATE TABLE "fruit" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "color" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Employee" (
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
    "ReportsTo" INTEGER,
    "Title" TEXT,
    "TitleOfCourtesy" TEXT
);

-- CreateTable
CREATE TABLE "Category" (
    "CategoryName" TEXT,
    "Description" TEXT,
    "Id" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "Customer" (
    "Address" TEXT,
    "City" TEXT,
    "CompanyName" TEXT,
    "ContactName" TEXT,
    "ContactTitle" TEXT,
    "Country" TEXT,
    "Fax" TEXT,
    "Id" TEXT NOT NULL PRIMARY KEY,
    "Phone" TEXT,
    "PostalCode" TEXT,
    "Region" TEXT
);

-- CreateTable
CREATE TABLE "Shipper" (
    "CompanyName" TEXT,
    "Id" TEXT NOT NULL PRIMARY KEY,
    "Phone" TEXT
);

-- CreateTable
CREATE TABLE "Supplier" (
    "Address" TEXT,
    "City" TEXT,
    "CompanyName" TEXT,
    "ContactName" TEXT,
    "ContactTitle" TEXT,
    "Country" TEXT,
    "Fax" TEXT,
    "HomePage" TEXT,
    "Id" TEXT NOT NULL PRIMARY KEY,
    "Phone" TEXT,
    "PostalCode" TEXT,
    "Region" TEXT
);

-- CreateTable
CREATE TABLE "Order" (
    "CustomerId" TEXT,
    "EmployeeId" INTEGER NOT NULL,
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

-- CreateTable
CREATE TABLE "Product" (
    "CategoryId" INTEGER NOT NULL,
    "Discontinued" INTEGER NOT NULL,
    "Id" TEXT NOT NULL PRIMARY KEY,
    "ProductName" TEXT,
    "QuantityPerUnit" TEXT,
    "ReorderLevel" INTEGER NOT NULL,
    "SupplierId" INTEGER NOT NULL,
    "UnitPrice" TEXT NOT NULL,
    "UnitsInStock" INTEGER NOT NULL,
    "UnitsOnOrder" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "OrderDetail" (
    "Discount" REAL NOT NULL,
    "Id" TEXT NOT NULL PRIMARY KEY,
    "OrderId" INTEGER NOT NULL,
    "ProductId" INTEGER NOT NULL,
    "Quantity" INTEGER NOT NULL,
    "UnitPrice" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "CustomerCustomerDemo" (
    "CustomerTypeId" TEXT,
    "Id" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "CustomerDemographic" (
    "CustomerDesc" TEXT,
    "Id" TEXT NOT NULL PRIMARY KEY
);

-- CreateTable
CREATE TABLE "Region" (
    "Id" TEXT NOT NULL PRIMARY KEY,
    "RegionDescription" TEXT
);

-- CreateTable
CREATE TABLE "Territory" (
    "Id" TEXT NOT NULL PRIMARY KEY,
    "RegionId" INTEGER NOT NULL,
    "TerritoryDescription" TEXT
);

-- CreateTable
CREATE TABLE "EmployeeTerritory" (
    "EmployeeId" INTEGER NOT NULL,
    "Id" TEXT NOT NULL PRIMARY KEY,
    "TerritoryId" TEXT
);
