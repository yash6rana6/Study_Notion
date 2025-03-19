const express = require('express');
const router = express.Router();

const {capturePayment,verifySignature,} = require('../controllers/Payment');

router.post('/capture', capturePayment);

router.post('/verify-signature', verifySignature);

module.exports = router;