const mongoose = require('mongoose');

// Función para generar códigos cortos
function generateShortCode() {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 4; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

const clickSchema = new mongoose.Schema({
  ip: String,
  timestamp: { type: Date, default: Date.now },
  userAgent: String
});

const qrUrlSchema = new mongoose.Schema({
  fullUrl: {
    type: String,
    required: true
  },
  shortUrl: {
    type: String,
    required: true,
    default: generateShortCode,
    unique: true
  },
  clicks: [clickSchema]
});

// Middleware para asegurar que el shortUrl sea único
qrUrlSchema.pre('save', async function(next) {
  const doc = this;
  if (doc.isNew || doc.isModified('shortUrl')) {
    const exists = await mongoose.models.QRUrl.findOne({ shortUrl: doc.shortUrl });
    if (exists) {
      doc.shortUrl = generateShortCode();
      return doc.save();
    }
  }
  next();
});

module.exports = mongoose.model('QRUrl', qrUrlSchema);