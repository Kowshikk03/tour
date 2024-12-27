const express = require('express');
const router = express.Router();
const Beach = require('../models/beach');


router.get('/listbeaches', async (req, res) => {
    try {
        const beaches = await Beach.find().sort({ name: 1 });
        res.json(beaches.map(beach => beach.name));
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch beach names' });
    }
});

module.exports = router;
