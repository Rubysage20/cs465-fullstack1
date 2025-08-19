// app_api/routes/index.js
const express = require('express');
const jwt = require('jsonwebtoken');

const tripsController = require('../controllers/trips');
const authController = require('../controllers/authentication');

const router = express.Router();

/** JWT auth middleware: expects "Authorization: Bearer <token>" */
function authenticateJWT(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization header missing or malformed' });
  }

  const parts = authHeader.split(' ');
  if (parts.length < 2) {
    return res.status(401).json({ message: 'Authorization header must be: Bearer <token>' });
  }

  const token = parts[1];
  if (!token) {
    return res.status(401).json({ message: 'Bearer token not provided' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Token validation error', error: err.message });
    }
    req.auth = decoded;            // attach decoded payload for controllers
    return next();                 // proceed only on successful verify
  });
}

/* ---------- Auth endpoints (public) ---------- */
router.post('/register', authController.register);
router.post('/login', authController.login);

/* ---------- Trip endpoints ---------- */
// List trips (public)
router.get('/trips', tripsController.tripsList);

// Create trip (protected)
router.post('/trips', authenticateJWT, tripsController.tripsAddTrip);

// Get trip by code (public)
router.get('/trips/:tripCode', tripsController.tripsFindByCode);

// Update trip by code (protected)
router.put('/trips/:tripCode', authenticateJWT, tripsController.tripsUpdateTrip);

module.exports = router;
