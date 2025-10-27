const Product = require("../models/productModel");
const multer = require("multer");
const path = require("path");
const Firm = require("../models/firmModel");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
   cb(null, path.resolve("uploads")); // folder where images will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
    // unique filename with original extension
  },
});

const upload = multer({ storage: storage });

const addProduct = async (req, res) => {
  try {
    const { productName, price, category, bestSeller, description } = req.body;
    // ensure file was uploaded (schema requires image)
    if (!req.file) {
       return res.status(400).json({message: "Image file is required. Use field name 'image' and multipart/form-data."});
    }
    const image = req.file.filename;
    
    const firmId = req.params.firmId;
    const firm = await Firm.findById(firmId);
    
    if (!firm) {
      return res.status(404).json({ message: "firm not found" });
    }
    
    const product = new Product({
      productName,
      price,
      category,
      image,
      bestSeller,
      description,
      firm: firm._id,
    });
    
    const savedProduct = await product.save();
    firm.products.push(savedProduct);
    await firm.save();
    
    res.status(201).json({message: "product added sucessfully", product});
  
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

const getProductsByFirm = async (req, res) => {

    try{
        const firmId = req.params.firmId;
        const firm = await Firm.findById(firmId);

        if(!firm){
            return res.status(404).json({message:"firm not found"});
        }

        const restaurantName = firm.firmName;
        const products = await Product.find({firm: firmId});
    res.status(200).json({restaurantName,products});
    }catch(error){
        console.error(error);
        return res.status(500).json({message: error.message});
    }
};


module.exports = {addProduct:[upload.single("image"),addProduct],getProductsByFirm};
