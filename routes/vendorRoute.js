const vendorController = require('../controllers/vendorcontroller');
const express = require('express');

const router = express.Router();

router.post('/register', vendorController.registerVendor);
router.post('/login', vendorController.loginVendor);

router.get("/getallvendors", vendorController.getAllVendors);
router.get("/vendor/:id", vendorController.getVendorById);

module.exports = router;


