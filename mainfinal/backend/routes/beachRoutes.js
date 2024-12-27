const express = require('express');
const router = express.Router();
const beachController = require('../controllers/beachController');

router.get('/:name', beachController.getBeachByName);

module.exports = router;
