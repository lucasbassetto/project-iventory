const router = require("express").Router();
const ProductController = require("../controllers/ProductController");

const verifyToken = require("../helpers/verify-token");
const { imageUpload } = require("../helpers/image-upload");

router.post("/save", verifyToken, imageUpload.array('images'), ProductController.create)
router.get("/", ProductController.getAll)
router.get("/myProducts", verifyToken, ProductController.getAllUserProducts)
router.get("/myRentals", verifyToken, ProductController.getAllUserRentals)
router.get("/:id", ProductController.getProductById)
router.delete("/:id", verifyToken, ProductController.deleteProductById)
router.patch("/:id", verifyToken, imageUpload.array('images'), ProductController.updateProduct)
router.patch("/doRent/:id", verifyToken, ProductController.doRent)

module.exports = router;