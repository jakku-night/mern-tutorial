const express = require('express');
const router = express.Router();

router.get('/api/users/', (req, res) => {
    res.json({"message": 'Hello'});
});

module.exports = router;