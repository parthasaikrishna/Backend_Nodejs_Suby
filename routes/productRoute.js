const express =require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const path = require("path");


router.post("/addproduct/:firmId",productController.addProduct);

router.get("/getproducts/:firmId",productController.getProductsByFirm);

router.get("/uploads/:imageName", (req,res)=>{
    const imageName = req.params.imageName;
    res.setHeader("Content-Type","image/jpeg");
    res.sendFile(path.join(__dirname,"../uploads/"+imageName));

})


module.exports = router;
