const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { sequelize } = require('./models');

const userRoutes = require('./routes/user.routes');
const orderRoutes = require('./routes/order.routes');
const productRoutes = require('./routes/product.routes');
const categoryRoutes = require('./routes/category.routes');
const feedbackRoutes = require('./routes/feedbackRoutes');

const app = express();

// Middleware: read JSON and form bodies, allow other origins
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Logging middleware: print every request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Routes
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/feedback', feedbackRoutes);

// 404 middleware: no route matched
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// 500 middleware: error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong' });
});

// Create the SQLite tables if they do not exist
sequelize.sync({ force: false })
  .then(() => console.log('SQLite synced'))
  .catch(err => console.log(err));

// Connect to MongoDB, then start the server
mongoose.connect('mongodb://localhost:27017/ecommerce_db')
  .then(() => {
    console.log('MongoDB connected');
    app.listen(3000, () => console.log('Server running on http://localhost:3000'));
  })
  .catch(err => console.log(err));
