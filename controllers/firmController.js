const Vendor = require("../models/venderModel");
const Firm = require("../models/firmModel");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })



// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // folder where images will be stored
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//     // unique filename with original extension
//   },
// });

// const upload = multer({ storage:storage })

// Create Firm
const addFirm = async (req, res) => {
  try {
    const { firmName, area, catogery, region, offer } = req.body;
    const image = req.file ? req.file.filename : undefined;

      // ✅ Check if vendorId is attached
    if (!req.vendorId) {
      return res.status(400).json({ message: "Vendor ID missing in request" });
    }

    // ✅ Find the vendor safely
    console.log("req.vendorId:", req.vendorId);

    const vendor = await Vendor.findById(req.vendorId);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }

    const firm = new Firm({
      firmName,
      area,
      catogery,
      region,
      offer,
      image,
      vendor: vendor._id,
    });

   const savedFirm =  await firm.save();
   vendor.firm.push(savedFirm);
   await vendor.save();
   
    res.status(201).json({ message: "firm added successfully to the vendor", firm });
  } catch (error) {
    console.error(error);
    console.log("Error details:", error);
    
    return res.status(500).json({ "message": error.message });
  }
};

module.exports = { addFirm: [upload.single("image"), addFirm] };
