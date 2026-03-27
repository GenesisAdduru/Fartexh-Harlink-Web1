const express = require('express');
const router = express.Router();
const { createDonation, getDonations, getDonationById, updateDonationStatus } = require('../controllers/donationController');

router.post('/', createDonation);
router.get('/', getDonations);
router.get('/:id', getDonationById);
router.put('/:id/status', updateDonationStatus);

module.exports = router;
