const mongoose = require('mongoose');

mongoose.connect('mongodb://team4:team4@130.203.136.203:27017/team4DB');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', async () => {
  console.log('MongoDB connected!');

  await db.createCollection('shopper');
  await db.createCollection('products');
  await db.createCollection('cart');
  await db.createCollection('shipping');
  await db.createCollection('returns');

  console.log('Collections created!');

  const result = await db.collection('cart').insertOne({
    productName: 'Test Product',
    quantity: 2,
    price: 49.99
  });

  console.log('Data saved to MongoDB:', result);
});