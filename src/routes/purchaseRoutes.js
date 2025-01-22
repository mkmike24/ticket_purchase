const express = require('express');
const { purchaseTickets, getPurchaseHistory } = require('../controllers/purchaseController');
const { authenticate } = require('../middlewares/authMiddleware');

const router = express.Router();

// Purchase tickets
router.post('/purchase', authenticate, purchaseTickets);
/**
 * @swagger
 * /api/purchases/purchase:
 *   post:
 *     summary: Purchase tickets
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               eventId:
 *                 type: string
 *                 example: 63c9b1d8a1b1b2a0f3d9e4c1
 *               tickets:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     category:
 *                       type: string
 *                       example: VIP
 *                     quantity:
 *                       type: number
 *                       example: 2
 *     responses:
 *       201:
 *         description: Tickets purchased successfully
 *       400:
 *         description: Bad request
 */

// View purchase history
router.get('/history', authenticate, getPurchaseHistory);
/**
 * @swagger
 * /api/purchases/history:
 *   get:
 *     summary: Retrieve purchase history
 *     responses:
 *       200:
 *         description: List of purchases
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   event:
 *                     type: string
 *                   tickets:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         category:
 *                           type: string
 *                         quantity:
 *                           type: number
 */


module.exports = router;