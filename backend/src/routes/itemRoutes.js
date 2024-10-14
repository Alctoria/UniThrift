const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const auth = require('../middleware/auth');

router.post('/', auth, itemController.createItem);
router.get('/search', itemController.searchItems);

module.exports = router;