const express = require("express");
const productsLogic = require("../business-logic-layer/products-logic");
const Product = require("../models/product")
const router = express.Router();

// GET http://localhost:3000/api/products
router.get("/", async (request, response) => {
    try {
        const products = await productsLogic.getAllProductsAsync();
        response.json(products);
    } catch (err) {
        response.status(500).send(err.message);
    }
});


// GET http://localhost:3000/api/products/7
router.get("/:id", async (request, response) => {
    try {
        const id = +request.params.id;
        const product = await productsLogic.getOneProductAsync(id);

        if (!product) {
            response.sendStatus(404);
            return;
        }

        response.json(product);
    } catch (err) {
        response.status(500).send(err.message);
    }
});

// POST http://localhost:3000/api/products
router.post("/", async (request, response) => {
    try {
        const product = new Product(request.body);
        const addedProduct = await productsLogic.addProductAsync(product);
        response.status(201).json(addedProduct);
    } catch (err) {
        response.status(500).send(err.message);
    }
});

// PUT http://localhost:3000/api/products/7
router.put("/:id", async (request, response) => {
    try {
        const id = +request.params.id;
        const product = request.body;
        product.id = id;
        const updatedProduct = await productsLogic.updateFullProductAsync(product);

        if (updatedProduct === null) {
            response.sendStatus(404);
            return;
        }

        response.json(updatedProduct);
    } catch (err) {
        response.status(500).send(err.message);
    }
});

// PATCH http://localhost:3000/api/products/7
router.patch("/:id", async (request, response) => {
    try {
        const id = +request.params.id;
        const product = request.body;
        product.id = id;
        const updatedProduct = await productsLogic.updatePartialProductAsync(product);

        if (updatedProduct === null) {
            response.sendStatus(404);
            return;
        }

        response.json(updatedProduct);
    } catch (err) {
        response.status(500).send(err.message);
    }
});

// DELETE http://localhost:3000/api/products/7
router.delete("/:id", async (request, response) => {
    try {
        const id = +request.params.id;
        await productsLogic.deleteProductAsync(id);
        response.sendStatus(204);
    } catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;