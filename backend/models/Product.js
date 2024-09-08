const mongoose = require('../db/connection');

const { Schema } = mongoose;

const Product = mongoose.model(
    'Product',

    new Schema(
        {
            name: {type: String, required: true},
            productType: {type: String, required: true},
            images: {type: Array, required: true},
            description: {type: String, required: true},
            user: Object,
            renter: Object
        },
        {timestamps: true})
);

module.exports = Product;