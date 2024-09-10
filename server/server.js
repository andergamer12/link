const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const shortUrlRoutes = require('./routes/ShortUrl');
const qrUrlRoutes = require('./routes/qrUrl'); 
mongoose.set('strictQuery', false);
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoURI = 'mongodb+srv://runway7:<runway7fashion>@mediaregister.z5g1rnk.mongodb.net/link?retryWrites=true&w=majority&appName=link';
mongoose.connect(mongoURI)

.then(() => console.log('MongoDB connected'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);  // Detener la aplicación si no se puede conectar a la base de datos
});


app.use('/', shortUrlRoutes);
app.use('/qr', qrUrlRoutes);




app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
