const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const pokemonRoutes = require('./routes/pokemonRoutes');
const app = express();
const PORT = process.env.PORT || 3001;

mongoose.connect('our-mongodb-connection-string', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());
app.use('/api', pokemonRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });