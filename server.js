import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { config } from './config.js';
import { Product } from './models/Product.js';

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(`mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}/${config.dbName}`)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB', err));

app.get('/products', async (req, res) => {
  const products = await Product.find();
  //console.log(products);
  res.json(products);
});

app.post('/products', async (req, res) => {
  const product = new Product({
    nombre: req.body.nombre,
    precio: req.body.precio,
    cantidad: req.body.cantidad,
  });
  try {
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product == null) {
      return res.status(404).json({ message: 'Cannot find product' });
    }

    await product.deleteOne({ _id: req.params.id });
    res.json({ message: 'Deleted product' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

app.listen(3000, () => console.log('Server is running on port 3000'));