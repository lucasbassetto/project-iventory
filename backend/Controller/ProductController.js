const Product = require('../models/Product');

const getToken = require('../helpers/get-token');
const getUserByToken = require('../helpers/get-user-by-token');

const ObjectId = require('mongoose').Types.ObjectId;

module.exports = class ProductController {

    static async create(req, res) {

        const { name, productType, description } = req.body;

        const images = req.files

        if(!name) {
            return res.status(422).json({message: 'Name is required'});
        }

        if(!productType) {
            return res.status(422).json({message: 'Product Type is required'});
        }

        if(!description) {
            return res.status(422).json({message: 'Description is required'});
        }

        if(images.length === 0) {
            return res.status(422).json({message: 'Images are required'});
        }

        const token = getToken(req);
        const user = await getUserByToken(token);

        const product = new Product({
            name,
            productType,
            description,
            images: [],
            user: {
                _id: user._id,
                name: user.name,
                image: user.image,
                phones: user.phone
            }
        });

        images.map((image) => {
            product.images.push(image.filename)
        })

        try {
            const savedProduct = await product.save();
            res.status(201).json({message: 'Product created', savedProduct});
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }

    static async getAll(req, res) {
        const products = await Product.find().sort("-createdAt");

        res.status(200).json({products: products});
    }

    static async getAllUserProducts(req, res) {
        const token =  getToken(req);
        const user = await getUserByToken(token);

        const products = await Product.find({"user._id": user._id}).sort("-createdAt");

        res.status(200).json({products});
    }

    static async getAllUserRentals(req, res) {
        const token =  getToken(req);
        const user = await getUserByToken(token);

        const products = await Product.find({"renter._id": user._id}).sort("-createdAt");

        res.status(200).json({products});
    }

    static async getProductById(req, res) {
        const id = req.params.id;

        if(!ObjectId.isValid(id)) {
            return res.status(422).json({message: 'Invalid product id'});
        }

        const product = await Product.findOne({_id: id});

        if(!product) {
            return res.status(404).json({message: 'Product not found'});
        }

        res.status(200).json({product: product});
    }

    static async deleteProductById(req, res) {
        const id = req.params.id;

        if(!ObjectId.isValid(id)) {
            return res.status(422).json({message: 'Invalid product id'});
        }

        const product = await Product.findOne({_id: id});

        if(!product) {
            return res.status(404).json({message: 'Product not found'});
        }

        const token = getToken(req);
        const user = await getUserByToken(token);

        if(product.user._id.toString() !== user._id.toString()) {
            return res.status(403).json({message: 'You are not allowed to delete this product'});
        }

        await Product.findByIdAndDelete(id);
        res.status(200).json({message: 'Product deleted'});
    }

    static async updateProduct(req, res) {
        const id = req.params.id;

        const { name, productType, description, runtime } = req.body;

        const images = req.files

        const updatedData = {};

        const product = await Product.findOne({_id: id});

        if(!product) {
            return res.status(404).json({message: 'Product not found'});
        }

        const token = getToken(req);
        const user = await getUserByToken(token);

        if(product.user._id.toString() !== user._id.toString()) {
            return res.status(403).json({message: 'You are not allowed to delete this product'});
        }

        if(!name) {
            return res.status(422).json({message: 'Name is required'});
        } else {
            updatedData.name = name;
        }


        if(!productType) {
            return res.status(422).json({message: 'Product Type is required'});
        } else {
            updatedData.productType = productType;
        }

        if(!description) {
            return res.status(422).json({message: 'Description is required'});
        } else {
            updatedData.description = description;
        }

        if(images.length > 0) {
            updatedData.images = [];
            images.map((image) => {
                updatedData.images.push(image.filename)
            })
        }

        await Product.findByIdAndUpdate(id, updatedData);
        res.status(200).json({message: 'Product updated'});
    }

    static async doRent(req, res) {
        const id = req.params.id;

        const product = await Product.findOne({_id: id});

        if(!product) {
            return res.status(404).json({message: 'Product not found'});
        }

        const token = getToken(req);
        const user = await getUserByToken(token);

        if(product.user._id.toString() !== user._id.toString()) {
            return res.status(403).json({message: 'You are not allowed to rent this product'});
        }

        product.available = false;

        await Product.findByIdAndUpdate(id, product);
        res.status(200).json({message: 'Product rented'});
    }
}