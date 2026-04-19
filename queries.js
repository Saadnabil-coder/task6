const createDatabaseAndTables = `
CREATE DATABASE IF NOT EXISTS retail_store;
USE retail_store;

CREATE TABLE IF NOT EXISTS Suppliers (
    SupplierID INT AUTO_INCREMENT PRIMARY KEY,
    SupplierName VARCHAR(100),
    ContactNumber VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS Products (
    ProductID INT AUTO_INCREMENT PRIMARY KEY,
    ProductName VARCHAR(100),
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
`;

const otherQueries = `
USE retail_store;

ALTER TABLE Products ADD Category VARCHAR(50);
ALTER TABLE Products DROP COLUMN Category;
ALTER TABLE Suppliers MODIFY ContactNumber VARCHAR(15);
ALTER TABLE Products MODIFY ProductName VARCHAR(100) NOT NULL;

INSERT INTO Suppliers (SupplierName, ContactNumber)
VALUES ('FreshFoods', '01001234567');

INSERT INTO Products (ProductName, Price, StockQuantity, SupplierID)
VALUES 
('Milk', 15.00, 50, 1),
('Bread', 10.00, 30, 1),
('Eggs', 20.00, 40, 1);

INSERT INTO Sales (ProductID, QuantitySold, SaleDate)
VALUES (1, 2, '2025-05-20');

UPDATE Products SET Price = 25.00 WHERE ProductName = 'Bread';
DELETE FROM Products WHERE ProductName = 'Eggs';

CREATE USER 'store_manager'@'localhost' IDENTIFIED BY '1234';
GRANT SELECT, INSERT, UPDATE ON retail_store.* TO 'store_manager'@'localhost';
REVOKE UPDATE ON retail_store.* FROM 'store_manager'@'localhost';
GRANT DELETE ON retail_store.Sales TO 'store_manager'@'localhost';
`;

module.exports = { createDatabaseAndTables, otherQueries };