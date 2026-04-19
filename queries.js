
const { executeQuery } = require('./db');

// 1. Create Tables
const createTables = async () => {
    await executeQuery(`
        CREATE TABLE IF NOT EXISTS Suppliers (
            SupplierID INT AUTO_INCREMENT PRIMARY KEY,
            SupplierName VARCHAR(100) NOT NULL,
            ContactNumber VARCHAR(20)
        );
    `);

    await executeQuery(`
        CREATE TABLE IF NOT EXISTS Products (
            ProductID INT AUTO_INCREMENT PRIMARY KEY,
            ProductName VARCHAR(100) NOT NULL,
            Price DECIMAL(10,2),
            StockQuantity INT DEFAULT 0,
            SupplierID INT,
            FOREIGN KEY (SupplierID) REFERENCES Suppliers(SupplierID)
        );
    `);

    await executeQuery(`
        CREATE TABLE IF NOT EXISTS Sales (
            SaleID INT AUTO_INCREMENT PRIMARY KEY,
            ProductID INT,
            QuantitySold INT,
            SaleDate DATE,
            FOREIGN KEY (ProductID) REFERENCES Products(ProductID)
        );
    `);
    console.log('1. Tables created');
};

// 2. Add Category column
const addCategory = async () => {
    await executeQuery(`ALTER TABLE Products ADD COLUMN Category VARCHAR(50);`);
    console.log('2. Category column added');
};

// 3. Drop Category column
const dropCategory = async () => {
    await executeQuery(`ALTER TABLE Products DROP COLUMN Category;`);
    console.log('3. Category column dropped');
};

// 4. Modify ContactNumber
const modifyContact = async () => {
    await executeQuery(`ALTER TABLE Suppliers MODIFY ContactNumber VARCHAR(15);`);
    console.log('4. ContactNumber modified to VARCHAR(15)');
};

// 5. Add NOT NULL to ProductName
const addNotNull = async () => {
    await executeQuery(`ALTER TABLE Products MODIFY ProductName VARCHAR(100) NOT NULL;`);
    console.log('5. NOT NULL added to ProductName');
};

// 6. Inserts
const insertData = async () => {
    const [supplier] = await executeQuery(`
        INSERT INTO Suppliers (SupplierName, ContactNumber) 
        VALUES ('FreshFoods', '01001234567');
    `);
    const supplierId = supplier.insertId;

    await executeQuery(`
        INSERT INTO Products (ProductName, Price, StockQuantity, SupplierID)
        VALUES 
            ('Milk', 15.00, 50, ?),
            ('Bread', 10.00, 30, ?),
            ('Eggs', 20.00, 40, ?);
    `, [supplierId, supplierId, supplierId]);

    const [milk] = await executeQuery(`SELECT ProductID FROM Products WHERE ProductName = 'Milk' LIMIT 1`);
    
    await executeQuery(`
        INSERT INTO Sales (ProductID, QuantitySold, SaleDate) 
        VALUES (?, 2, '2025-05-20');
    `, [milk.ProductID]);

    console.log('6. Data inserted successfully');
};

// 7. Update Bread price
const updateBread = async () => {
    await executeQuery(`UPDATE Products SET Price = 25.00 WHERE ProductName = 'Bread';`);
    console.log('7. Bread price updated');
};

// 8. Delete Eggs
const deleteEggs = async () => {
    await executeQuery(`DELETE FROM Products WHERE ProductName = 'Eggs';`);
    console.log('8. Eggs deleted');
};

// 9. Total quantity sold per product
const totalSold = async () => {
    const result = await executeQuery(`
        SELECT p.ProductName, COALESCE(SUM(s.QuantitySold), 0) AS TotalSold
        FROM Products p LEFT JOIN Sales s ON p.ProductID = s.ProductID
        GROUP BY p.ProductID, p.ProductName;
    `);
    console.log('9. Total sold:', result);
    return result;
};

// 10. Highest stock
const highestStock = async () => {
    const result = await executeQuery(`
        SELECT ProductName, StockQuantity FROM Products 
        ORDER BY StockQuantity DESC LIMIT 1;
    `);
    console.log('10. Highest stock:', result);
    return result;
};

// 11. Suppliers starting with F
const suppliersF = async () => {
    const result = await executeQuery(`SELECT * FROM Suppliers WHERE SupplierName LIKE 'F%';`);
    console.log('11. Suppliers with F:', result);
    return result;
};

// 12. Unsold products
const unsoldProducts = async () => {
    const result = await executeQuery(`
        SELECT p.ProductName FROM Products p
        LEFT JOIN Sales s ON p.ProductID = s.ProductID
        WHERE s.SaleID IS NULL;
    `);
    console.log('12. Unsold products:', result);
    return result;
};

// 13. All sales with product name
const salesDetails = async () => {
    const result = await executeQuery(`
        SELECT p.ProductName, s.QuantitySold, s.SaleDate 
        FROM Sales s JOIN Products p ON s.ProductID = p.ProductID;
    `);
    console.log('13. Sales details:', result);
    return result;
};

// Export all functions
module.exports = {
    createTables,
    addCategory,
    dropCategory,
    modifyContact,
    addNotNull,
    insertData,
    updateBread,
    deleteEggs,
    totalSold,
    highestStock,
    suppliersF,
    unsoldProducts,
    salesDetails
};
