const router = require('express').Router()
const Product = require('../models/product')

const upload = require('../middlewares/upload-photo')

// POST - create a new product 
router.post('/products', upload.single('photo'), async (req, res) => {
    try {
        let product = new Product()
        product.ownerID = req.body.ownerID
        product.categoryID = req.body.categoryID
        product.price = req.body.price 
        product.title = req.body.title
        product.description = req.body.description
        product.photo = req.file.location
        product.stockQuantity = req.body.stockQuantity

        await product.save()

        res.json({
            status: true,
            message: 'Product Saved!'
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

router.get('/products', async (req, res) => {
    try {
        let products = await Product.find()
        res.json({
            success: true,
            products: products
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

// get a single post 
router.get('/products/:id', async (req, res) => {
    try {
        let product = await Product.findOne({
            _id: req.params.id
        })
        res.json({
            success: true,
            product: product
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

// update a single post 
router.put('/products/:id', async (req, res) => {
    try {
        let product = await Product.findOne({
            _id: req.params.id
        }, {
            $set: {
                title: req.body.title,
                price: req.body.price,
                category: req.body.categoryID,
                photo: req.file.locatin,
                description: req.body.description,
                owner: req.body.ownerID
            }
        }, {
            upsert: true
        })
        res.json({
            success: true,
            updatedProduct: product
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})

router.delete('/products/:id', async (req, res) => {
    try {
        let deletedProduct = await Product.findOneAndDelete({
            _id: req.params.id
        })

        if (deletedProduct) {
            res.json({
                status: true,
                message: 'Product has been deleted!'
            })
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        })
    }
})


module.exports = router