const express = require('express');
const {
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
} = require('./queries');

const app = express();
app.use(express.json());

// ====================== Setup Routes ======================

app.get('/create-tables', async (req, res) => {
    try {
        await createTables();
        res.send('Tables created successfully');
    } catch (err) {
        res.status(500).send('Error: ' + err.message);
    }
});

app.get('/add-category', async (req, res) => {
    try {
        await addCategory();
        res.send('Category column added successfully');
    } catch (err) {
        res.status(500).send('Error: ' + err.message);
    }
});

app.get('/drop-category', async (req, res) => {
    try {
        await dropCategory();
        res.send('Category column dropped successfully');
    } catch (err) {
        res.status(500).send('Error: ' + err.message);
    }
});

app.get('/modify-contact', async (req, res) => {
    try {
        await modifyContact();
        res.send('ContactNumber modified successfully');
    } catch (err) {
        res.status(500).send('Error: ' + err.message);
    }
});

app.get('/add-not-null', async (req, res) => {
    try {
        await addNotNull();
        res.send('NOT NULL constraint added successfully');
    } catch (err) {
        res.status(500).send('Error: ' + err.message);
    }
});

app.get('/insert-data', async (req, res) => {
    try {
        await insertData();
        res.send('Data inserted successfully');
    } catch (err) {
        res.status(500).send('Error: ' + err.message);
    }
});

app.get('/update-bread', async (req, res) => {
    try {
        await updateBread();
        res.send('Bread price updated successfully');
    } catch (err) {
        res.status(500).send('Error: ' + err.message);
    }
});

app.get('/delete-eggs', async (req, res) => {
    try {
        await deleteEggs();
        res.send('Eggs deleted successfully');
    } catch (err) {
        res.status(500).send('Error: ' + err.message);
    }
});

// ====================== Query Routes ======================

app.get('/total-sales', async (req, res) => {
    try {
        const result = await totalSold();
        res.json(result);
    } catch (err) {
        res.status(500).send('Error: ' + err.message);
    }
});

app.get('/highest-stock', async (req, res) => {
    try {
        const result = await highestStock();
        res.json(result);
    } catch (err) {
        res.status(500).send('Error: ' + err.message);
    }
});

app.get('/suppliers-f', async (req, res) => {
    try {
        const result = await suppliersF();
        res.json(result);
    } catch (err) {
        res.status(500).send('Error: ' + err.message);
    }
});

app.get('/unsold-products', async (req, res) => {
    try {
        const result = await unsoldProducts();
        res.json(result);
    } catch (err) {
        res.status(500).send('Error: ' + err.message);
    }
});

app.get('/sales-details', async (req, res) => {
    try {
        const result = await salesDetails();
        res.json(result);
    } catch (err) {
        res.status(500).send('Error: ' + err.message);
    }
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
