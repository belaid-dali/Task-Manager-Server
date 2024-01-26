require('dotenv').config(); 
const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URI;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose.connect(mongoURI, options) 
        .then(() => {
            console.log('MongoDB connected')
        })
        .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });