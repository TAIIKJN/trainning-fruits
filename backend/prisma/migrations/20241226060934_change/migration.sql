/*
  Warnings:

  - You are about to drop the column `CompanyName` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `ContactName` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `ContactTitle` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `Fax` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `Phone` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `Region` on the `Customer` table. All the data in the column will be lost.
  - You are about to drop the column `Extension` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `HireDate` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `HomePhone` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `Region` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `ReportsTo` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `TitleOfCourtesy` on the `Employee` table. All the data in the column will be lost.
  - Added the required column `FirstName` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `LastName` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Title` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UserName` to the `Customer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `UserName` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Made the column `FirstName` on table `Employee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `LastName` on table `Employee` required. This step will fail if there are existing NULL values in that column.
  - Made the column `Title` on table `Employee` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Customer" (
    "Id" TEXT NOT NULL PRIMARY KEY,
    "Title" TEXT NOT NULL,
    "FirstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "BirthDate" TEXT,
    "Email" TEXT,
    "UserName" TEXT NOT NULL,
    "Address" TEXT,
    "City" TEXT,
    "Country" TEXT,
    "PostalCode" TEXT,
    "Notes" TEXT,
    "Photo" TEXT,
    "PhotoPath" TEXT,
    "Role" TEXT NOT NULL DEFAULT 'General'
);
INSERT INTO "new_Customer" ("Address", "City", "Country", "Id", "PostalCode") SELECT "Address", "City", "Country", "Id", "PostalCode" FROM "Customer";
DROP TABLE "Customer";
ALTER TABLE "new_Customer" RENAME TO "Customer";
CREATE UNIQUE INDEX "Customer_Email_key" ON "Customer"("Email");
CREATE UNIQUE INDEX "Customer_UserName_key" ON "Customer"("UserName");
CREATE TABLE "new_Employee" (
    "Id" TEXT NOT NULL PRIMARY KEY,
    "Title" TEXT NOT NULL,
    "FirstName" TEXT NOT NULL,
    "LastName" TEXT NOT NULL,
    "BirthDate" TEXT,
    "Email" TEXT,
    "UserName" TEXT NOT NULL,
    "Address" TEXT,
    "City" TEXT,
    "Country" TEXT,
    "PostalCode" TEXT,
    "Notes" TEXT,
    "Photo" TEXT,
    "PhotoPath" TEXT
);
INSERT INTO "new_Employee" ("Address", "BirthDate", "City", "Country", "FirstName", "Id", "LastName", "Notes", "Photo", "PhotoPath", "PostalCode", "Title") SELECT "Address", "BirthDate", "City", "Country", "FirstName", "Id", "LastName", "Notes", "Photo", "PhotoPath", "PostalCode", "Title" FROM "Employee";
DROP TABLE "Employee";
ALTER TABLE "new_Employee" RENAME TO "Employee";
CREATE UNIQUE INDEX "Employee_Email_key" ON "Employee"("Email");
CREATE UNIQUE INDEX "Employee_UserName_key" ON "Employee"("UserName");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
