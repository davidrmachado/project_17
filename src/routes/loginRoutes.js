const express = require('express');

const router = express.Router();

const crypto = require('crypto');

router.post('/', async (_req, res) => {
    res.status(200).json({ token:
    crypto.randomBytes(8).toString('hex') });
});

module.exports = router;
