const express = require('express');
const router = express.Router();
const { createWigRequest, getWigRequests, getWigRequestById, updateWigRequestStatus } = require('../controllers/requestController');

router.post('/', createWigRequest);
router.get('/', getWigRequests);
router.get('/:id', getWigRequestById);
router.put('/:id/status', updateWigRequestStatus);

module.exports = router;
