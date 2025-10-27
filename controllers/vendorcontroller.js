const Vendor = require("../models/venderModel");
require("../models/firmModel"); // <-- Add this line at the top
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotEnv = require("dotenv");
dotEnv.config();
const jwtSecret = process.env.JWT_SECRET;

const registerVendor = async (req, res) => {
  const { name, email, password } = req.body;
  const vendor = await Vendor.findOne({ email });
  try {
    if (vendor) {
      return res.status(400).json({ message: "user already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newVendor = new Vendor({
      name,
      email,
      password: hashedPassword,
    });
    await newVendor.save();
    res.status(201).json({ message: "Vendor registered successfully", token });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const loginVendor = async (req, res) => {
  const { email, password /*fromdatabase*/ } = req.body;
  const vendor = await Vendor.findOne({ email });
  if (!vendor) {
    return res.status(404).json({ message: "Vendor not found" });
  }
  const isMatch = await bcrypt.compare(
    password,
    vendor.password /* from user input */
  );
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ vendorId: vendor._id }, jwtSecret, {
    expiresIn: "1d",
  });

  res.status(200).json({ message: "Vendor logged in successfully", token });
  console.log("this is vendor token: ", token);
};

const getAllVendors = async (req, res) => {
  try {
    const vendors = await Vendor.find().populate("firm");
    res.status(200).json(vendors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getVendorById = async (req, res) => {
  const vendorId = req.params.id;
  try {
    const vendor = await Vendor.findById(vendorId);

    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    res.status(200).json(vendor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



module.exports = { registerVendor, loginVendor, getAllVendors, getVendorById };

