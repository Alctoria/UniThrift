const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const auth = require('../middleware/auth');

router.post('/items', auth, itemController.createItem);
router.get('/items/search', itemController.searchItems);
// Add other routes as needed

module.exports = router;