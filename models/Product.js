// models/Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  nombre: String,
  precio: Number,
  cantidad: Number,
  // Agrega aquí cualquier otro campo que tus productos puedan tener
});

export const Product = mongoose.model('productos', productSchema);