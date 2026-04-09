// Author: Liya Aji
// Task: NodeJS backend - RESTful services to handle receiving JSON collections (shopper, cart, billing, returns)

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3004; 

app.use(bodyParser.json());

// Test route
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Test POST route
app.post('/test', (req, res) => {
    console.log(req.body);
    res.json({ message: 'Data received!', data: req.body });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
// Recieve Returns Data
app.post('/returns', (req, res) => {
    console.log("Returns Data:", req.body);
    res.json({ status: "Returns received" });
});

// Recieve Billing Data 
app.post('/billing', (req, res) => {
    console.log("Billing Data:", req.body);
    res.json({ status: "Billing received" });
});

// Recieve Shopping Cart
app.post('/cart', (req, res) => {
    console.log("Cart Data:", req.body);
    res.json({ status: "Cart received" });
});
