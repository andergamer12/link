const express = require('express');
const router = express.Router();
const QRUrl = require('../models/QRUrl');
const UAParser = require('ua-parser-js');

router.post('/shorten', async (req, res) => {
  const { fullUrl } = req.body;
  const qrUrl = new QRUrl({ fullUrl });
  await qrUrl.save();
  res.json(qrUrl);
});

router.get('/urls', async (req, res) => {
  const urls = await QRUrl.find();
  res.json(urls);
});

router.get('/:shortUrl', async (req, res) => {
  try {
    const qrUrl = await QRUrl.findOne({ shortUrl: req.params.shortUrl });
    if (!qrUrl) return res.sendStatus(404);

    const parser = new UAParser(req.headers['user-agent']);
    const userAgentInfo = parser.getResult();
    
    qrUrl.clicks.push({
      ip: req.ip,
      timestamp: new Date(),
      userAgent: JSON.stringify({
        browser: userAgentInfo.browser,
        os: userAgentInfo.os
      })
    });

    await qrUrl.save();
    res.redirect(qrUrl.fullUrl);
  } catch (error) {
    console.error('Error al procesar la redirección de QR:', error);
    res.status(500).send('Error del servidor');
  }
});

router.put('/:id', async (req, res) => {
  const { fullUrl, shortUrl } = req.body;
  try {
    let updatedFields = {};
    
    if (fullUrl !== undefined) {
      updatedFields.fullUrl = fullUrl;
    }
    
    if (shortUrl !== undefined) {
      if (shortUrl.length <2) {
        return res.status(400).json({ error: 'Short URL must be 2 characters long' });
      }
      const existingUrl = await QRUrl.findOne({ shortUrl });
      if (existingUrl && existingUrl._id.toString() !== req.params.id) {
        return res.status(400).json({ error: 'This short URL is already in use' });
      }
      updatedFields.shortUrl = shortUrl;
    }

    if (Object.keys(updatedFields).length === 0) {
      return res.status(400).json({ error: 'No valid fields to update' });
    }

    const updatedUrl = await QRUrl.findByIdAndUpdate(
      req.params.id, 
      updatedFields, 
      { new: true, runValidators: true }
    );

    if (!updatedUrl) {
      return res.status(404).json({ error: 'URL not found' });
    }

    res.json(updatedUrl);
  } catch (error) {
    console.error('Error updating QR URL:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.delete('/:id', async (req, res) => {
  await QRUrl.findByIdAndDelete(req.params.id);
  res.sendStatus(204);
});

module.exports = router;