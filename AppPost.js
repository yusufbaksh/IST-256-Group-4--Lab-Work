const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://team4:team4@130.203.136.203:27017/team4DB');
const Shopper = mongoose.model('Shopper', new mongoose.Schema({ name: String, email: String, address: String }));
const Product = mongoose.model('Product', new mongoose.Schema({ name: String, price: Number, description: String }));
const Cart = mongoose.model('Cart', new mongoose.Schema({ productName: String, quantity: Number, price: Number }));
const Shipping = mongoose.model('Shipping', new mongoose.Schema({ name: String, address: String, city: String, zip: String }));
const Returns = mongoose.model('Returns', new mongoose.Schema({ orderId: String, reason: String, status: String }));

app.get('/products',  async (req, res) => res.json(await Product.find()));
app.post('/cart',     async (req, res) => res.json(await new Cart(req.body).save()));
app.post('/shipping', async (req, res) => res.json(await new Shipping(req.body).save()));
app.post('/returns',  async (req, res) => res.json(await new Returns(req.body).save()));
app.post('/billing',  (req, res) => res.json({ success: true, data: req.body }));

app.listen(3000, () => console.log('Server running on port 3000'));