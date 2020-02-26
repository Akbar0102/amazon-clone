const router = require('express').Router();
const Product = require('../models/product');

const upload = require('../middlewares/upload-photo');

// POST request - create a new product
router.post('/products', upload.single('photo'), async (req, res) => {
    try {
        let product = new Product();
        product.title = req.body.title;
        product.description = req.body.description;
        product.photo = 'public/images/uploads/'+req.file.filename;
        product.stockQuantity = req.body.stockQuantity;
        
        await product.save();

        res.json({
            status: true,
            message: "Successfully saved"
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        });
    }
});

// GET request - get all products
router.get('/products', async (req, res) => {
    try {
        let products = await Product.find();
        res.json({
            success: true,
            products: products
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// GET request - get a single product
router.get('/products/:id', async (req, res) => {
    try {
        let product = await Product.findOne({_id: req.params.id});
        res.json({
            success: true,
            product: product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// PUT request - update a single product
router.put('/products/:id', upload.single('photo'), async (req, res) => {
    try {
        let product = await Product.findOneAndUpdate(
            {_id: req.params.id},
            {
                $set: {
                    title: req.body.title,
                    price: req.body.price,
                    category: req.body.categoryID,
                    photo: req.file.path,
                    description: req.body.description,
                    owner: req.body.ownerID
                }
            },
            {upsert: true}
        );

        res.json({
            success: true,
            updatedProduct: product
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

// DELETE request - delete a single product
router.delete('/products/:id', async (req, res) =>{
    try {
        let deletedProduct = await Product.findByIdAndDelete({_id: req.params.id});

        if(deletedProduct){
            res.json({
                success: true,
                message: "Successfully deleted"
            });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;