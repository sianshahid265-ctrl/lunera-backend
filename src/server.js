require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Route
app.get('/', (req, res) => {
  res.send('Lunéra Jewelry Backend is Running! ✨');
});

// Import Product Model
const Product = require('./models/Product');

// Get All Products
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Seed Sample Products
app.get('/api/seed', async (req, res) => {
  try {
    await Product.deleteMany();
    
    const sampleProducts = [
      { 
        name: "18K Gold Necklace", 
        description: "Elegant handmade gold necklace with pendant", 
        price: 12500, 
        image: "https://via.placeholder.com/400x300?text=Gold+Necklace", 
        category: "Necklace" 
      },
      { 
        name: "Silver Hoop Earrings", 
        description: "Classic sterling silver hoop earrings", 
        price: 4500, 
        image: "https://via.placeholder.com/400x300?text=Silver+Earrings", 
        category: "Earrings" 
      },
      { 
        name: "Diamond Ring", 
        description: "Beautiful solitaire diamond ring", 
        price: 28500, 
        image: "https://via.placeholder.com/400x300?text=Diamond+Ring", 
        category: "Ring" 
      }
    ];

    await Product.insertMany(sampleProducts);
    res.json({ message: "✅ Sample products added successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB Connected Successfully');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err);
  }
};

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

connectDB();