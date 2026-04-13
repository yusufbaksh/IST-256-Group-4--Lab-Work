// Author: Liya Aji
// Task: NodeJS backend - RESTful services to handle JSON collections

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3004; 

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.send('Hello express!');
});

app.get('/hello', (req, res) => {
    res.send('Hello Secure HTTPS!');
});

// Receive Returns Data
app.post('/returns', (req, res) => {
    console.log("Returns Data:", req.body);
    res.json({ status: "Returns received" });
});

// Receive Billing Data
app.post('/billing', (req, res) => {
    console.log("Billing Data:", req.body);
    res.json({ status: "Billing received" });
});

// Receive Shopping Cart Data
app.post('/cart', (req, res) => {
    console.log("Cart Data:", req.body);
    res.json({ status: "Cart received" });
});

app.post('/products', (req, res) => {
    console.log("Product received:", req.body);
    res.json({ status: "Product received", data: req.body });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
