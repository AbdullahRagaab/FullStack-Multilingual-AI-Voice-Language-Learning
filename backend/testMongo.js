const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected ✅");
    process.exit(0);
  })
  .catch(err => {
    console.error("MongoDB connection error ❌", err);
    process.exit(1);
  });
