-- Create Database
CREATE DATABASE IF NOT EXISTS retail_store;
USE retail_store;

-- 1) Create Tables
CREATE TABLE IF NOT EXISTS Suppliers (
    SupplierID INT AUTO_INCREMENT PRIMARY KEY,
    SupplierName VARCHAR(100),
    ContactNumber VARCHAR(15)
);

CREATE TABLE IF NOT EXISTS Products (
    ProductID INT AUTO_INCREMENT PRIMARY KEY,
    ProductName VARCHAR(100) NOT NULL,
    Price DECIMAL(10,2),
    StockQuantity INT,
    SupplierID INT,
    FOREIGN KEY (SupplierID) REFERENCES Suppliers(SupplierID)
);

CREATE TABLE IF NOT EXISTS Sales (
    SaleID INT AUTO_INCREMENT PRIMARY KEY,
    ProductID INT,
    QuantitySold INT,
    SaleDate DATE,
    FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
);

-- 2) Add column Category
ALTER TABLE Products ADD Category VARCHAR(50);

-- 3) Remove Category column
ALTER TABLE Products DROP COLUMN Category;

-- 4) Modify ContactNumber
ALTER TABLE Suppliers MODIFY ContactNumber VARCHAR(15);

-- 5) Ensure ProductName NOT NULL
ALTER TABLE Products MODIFY ProductName VARCHAR(100) NOT NULL;

-- 6) Inserts
INSERT INTO Suppliers (SupplierName, ContactNumber)
VALUES ('FreshFoods', '01001234567');

INSERT INTO Products (ProductName, Price, StockQuantity, SupplierID)
VALUES 
('Milk', 15.00, 50, 1),
('Bread', 10.00, 30, 1),
('Eggs', 20.00, 40, 1);

INSERT INTO Sales (ProductID, QuantitySold, SaleDate)
VALUES (1, 2, '2025-05-20');

-- 7) Update price
UPDATE Products
SET Price = 25.00
WHERE ProductName = 'Bread';

-- 8) Delete Eggs
DELETE FROM Products
WHERE ProductName = 'Eggs';

-- 9) Total quantity sold per product
SELECT ProductID, SUM(QuantitySold) AS TotalSold
FROM Sales
GROUP BY ProductID;

-- 10) Highest stock product
SELECT * FROM Products
ORDER BY StockQuantity DESC
LIMIT 1;

-- 11) Suppliers starting with F
SELECT * FROM Suppliers
WHERE SupplierName LIKE 'F%';

-- 12) Products never sold
SELECT * FROM Products
WHERE ProductID NOT IN (SELECT ProductID FROM Sales);

-- 13) Sales with product name
SELECT p.ProductName, s.SaleDate
FROM Sales s
JOIN Products p ON s.ProductID = p.ProductID;

-- 14) Create user + permissions
CREATE USER 'store_manager'@'localhost' IDENTIFIED BY '1234';

GRANT SELECT, INSERT, UPDATE ON retail_store.* TO 'store_manager'@'localhost';

-- 15) Revoke UPDATE
REVOKE UPDATE ON retail_store.* FROM 'store_manager'@'localhost';

-- 16) Grant DELETE only on Sales
GRANT DELETE ON retail_store.Sales TO 'store_manager'@'localhost';