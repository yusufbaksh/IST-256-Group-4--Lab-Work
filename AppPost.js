const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
  'mongodb://team4:team4@130.203.136.203:27017/team4DB?authSource=admin'
)
.then(() => console.log("MongoDB connected successfully"))
.catch(err => console.log("MongoDB connection error:", err));
const Shopper = mongoose.model('Shopper', new mongoose.Schema({ name: String, email: String, address: String }));
const Product = mongoose.model('Product', new mongoose.Schema({ name: String, price: Number, description: String }));
const Cart = mongoose.model('Cart', new mongoose.Schema({ productName: String, quantity: Number, price: Number }));
const Shipping = mongoose.model('Shipping', new mongoose.Schema({ name: String, address: String, city: String, zip: String }));
const Returns = mongoose.model('Returns', new mongoose.Schema({ orderId: String, reason: String, status: String }));

app.get('/products',  async (req, res) => res.json(await Product.find()));
app.post('/shipping', async (req, res) => res.json(await new Shipping(req.body).save()));
app.post('/billing',  (req, res) => res.json({ success: true, data: req.body }));


//SHOPPER CRUD
app.post('/shopper', async (req,res)=>{
    res.json(await new Shopper(req.body).save());
});

app.get('/shopper', async (req,res)=>{
    res.json(await Shopper.find());
});

app.get('/shopper/:id', async (req,res)=>{
    res.json(await Shopper.findById(req.params.id));
});

app.put('/shopper/:id', async (req,res)=>{
    res.json(await Shopper.findByIdAndUpdate(req.params.id, req.body,{new:true}));
});

app.delete('/shopper/:id', async (req,res)=>{
    res.json(await Shopper.findByIdAndDelete(req.params.id));
});

//PRODUCT CRUD
app.post('/products', async (req,res)=>{
    res.json(await new Product(req.body).save());
});

app.get('/products/:id', async (req,res)=>{
    res.json(await Product.findById(req.params.id));
});

app.put('/products/:id', async (req,res)=>{
    res.json(await Product.findByIdAndUpdate(req.params.id, req.body,{new:true}));
});

app.delete('/products/:id', async (req,res)=>{
    res.json(await Product.findByIdAndDelete(req.params.id));
});

//CART CRUD
app.post('/cart', async (req,res)=>{
    res.json(await new Cart(req.body).save());
});

app.get('/cart', async (req,res)=>{
    res.json(await Cart.find());
});

app.put('/cart/:id', async (req,res)=>{
    res.json(await Cart.findByIdAndUpdate(req.params.id, req.body,{new:true}));
});

app.delete('/cart/:id', async (req,res)=>{
    res.json(await Cart.findByIdAndDelete(req.params.id));
});

//RETURNS CRUD
app.post('/returns', async (req,res)=>{
    res.json(await new Returns(req.body).save());
});

app.get('/returns', async (req,res)=>{
    res.json(await Returns.find());
});

app.put('/returns/:id', async (req,res)=>{
    res.json(await Returns.findByIdAndUpdate(req.params.id, req.body,{new:true}));
});

app.delete('/returns/:id', async (req,res)=>{
    res.json(await Returns.findByIdAndDelete(req.params.id));
});

app.listen(3004, () => console.log('Server running on port 3004'));
