const express = require('express');
const { createEvent, getEvents, editEvent, getTicketCategories } = require('../controllers/eventController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authenticate, createEvent);
/**
 * @swagger
 * /api/events:
 *   post:
 *     summary: Create a new event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Music Concert
 *               date:
 *                 type: string
 *                 example: 2025-01-25
 *               time:
 *                 type: string
 *                 example: 19:00
 *               venue:
 *                 type: string
 *                 example: Stadium
 *               tickets:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     category:
 *                       type: string
 *                       example: VIP
 *                     price:
 *                       type: number
 *                       example: 100
 *                     availability:
 *                       type: number
 *                       example: 50
 *     responses:
 *       201:
 *         description: Event created successfully
 */

router.get('/', getEvents);
/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Retrieve all events
 *     responses:
 *       200:
 *         description: A list of events
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   date:
 *                     type: string
 *                   time:
 *                     type: string
 *                   venue:
 *                     type: string
 */

router.put('/:id', authenticate, editEvent);
/**
 * @swagger
 * /api/events/{id}:
 *   put:
 *     summary: Edit an event
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The event ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               date:
 *                 type: string
 *               time:
 *                 type: string
 *               venue:
 *                 type: string
 *     responses:
 *       200:
 *         description: Event updated successfully
 *       404:
 *         description: Event not found
 *       403:
 *         description: Unauthorized to edit this event
 */

router.get('/:eventId/tickets', getTicketCategories);
/**
 * @swagger
 * /api/events/{eventId}/tickets:
 *   get:
 *     summary: Get ticket categories for an event
 *     description: Retrieve ticket categories with prices and availability for a specific event.
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the event
 *     responses:
 *       200:
 *         description: A list of ticket categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   category:
 *                     type: string
 *                     example: VIP
 *                   price:
 *                     type: number
 *                     example: 100
 *                   availability:
 *                     type: number
 *                     example: 50
 *       404:
 *         description: Event not found
 *       500:
 *         description: Server error
 */


module.exports = router;