const dal = require("../data-access-layer/dal");
const Product = require("../models/product")

dal.connectAsync()
    .then(db => console.log("We're connected to " + db.name + "on mongodb"))
    .catch(err => console.log(err))

function addProductAsync(product) {
    return product.save();

}

function getAllProductsAsync() {
    return new Promise((res, rej) => {
        Product.find({}, (err, products) => { //החזר את כל המוצרים = {}
            if (err) {
                rej(err)
                return
            }
            res(products)
        })
    })
}
module.exports = {
    addProductAsync,
    getAllProductsAsync
}