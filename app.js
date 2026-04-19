const express = require('express');
const connection = require('./db');
const { createDatabaseAndTables, otherQueries } = require('./queries');

const app = express();
app.use(express.json());

app.get('/setup', (req, res) => {
    connection.query(createDatabaseAndTables, (err) => {
        if (err) return res.send(err);

        connection.query(otherQueries, (err2) => {
            if (err2) return res.send(err2);

            res.send('Database and data created successfully');
        });
    });
});


app.get('/total-sales', (req, res) => {
    const q = `
    SELECT ProductID, SUM(QuantitySold) AS TotalSold
    FROM Sales
    GROUP BY ProductID
    `;
    connection.query(q, (err, result) => {
        if (err) return res.send(err);
        res.json(result);
    });
});


app.get('/highest-stock', (req, res) => {
    const q = `
    SELECT * FROM Products
    ORDER BY StockQuantity DESC
    LIMIT 1
    `;
    connection.query(q, (err, result) => {
        if (err) return res.send(err);
        res.json(result);
    });
});


app.get('/suppliers-f', (req, res) => {
    connection.query(
        "SELECT * FROM Suppliers WHERE SupplierName LIKE 'F%'",
        (err, result) => {
            if (err) return res.send(err);
            res.json(result);
        }
    );
});


app.get('/unsold-products', (req, res) => {
    const q = `
    SELECT * FROM Products
    WHERE ProductID NOT IN (SELECT ProductID FROM Sales)
    `;
    connection.query(q, (err, result) => {
        if (err) return res.send(err);
        res.json(result);
    });
});

app.get('/sales-details', (req, res) => {
    const q = `
    SELECT p.ProductName, s.SaleDate
    FROM Sales s
    JOIN Products p ON s.ProductID = p.ProductID
    `;
    connection.query(q, (err, result) => {
        if (err) return res.send(err);
        res.json(result);
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});