const express = require('express');
const { createEvent, getEvents, editEvent } = require('../controllers/eventController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authenticate, createEvent);
router.get('/', getEvents);
router.put('/:id', authenticate, editEvent);

module.exports = router;