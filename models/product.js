const mongoose = require("mongoose")

//create Schema of a product: מה יש במוצר
const ProductSchema = mongoose.Schema({
    name: String,
    price: Number,
    stock: Number
}, {
    versionKey: false // לא להוסיף פרמטר נוסף עבור גרסה
})

const Product = mongoose.model("Product", ProductSchema, "products") // MODELNAME,SCHEMA,COLLECTION

module.exports = Product;