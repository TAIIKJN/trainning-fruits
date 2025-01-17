/*
  Warnings:

  - You are about to drop the `CustomerCustomerDemo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CustomerDemographic` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `EmployeeTerritory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Region` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Shipper` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Territory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "CustomerCustomerDemo";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "CustomerDemographic";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "EmployeeTerritory";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Region";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Shipper";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Territory";
PRAGMA foreign_keys=on;
