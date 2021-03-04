const router = require('express').Router()
const Category = require('../models/category')

router.post('/categories', async (req, res) => {
    try {
        const category = new Category()

        await category.save()

        res.json({
            status: true, 
            message: 'Category created!'
        })
    } catch (err) {
        res.status(500).json({
            success: false, 
            message: err.message 
        })
    }
})


router.get('/categories', async (req, res) => {
    try {
        let categories = await Category.find()
        res.json({
            success: true, 
            categories: categories
        })
    } catch (err) {}
}) 

module.exports = router