const router = require('express').Router();
const Owner = require('../models/owner');

//POST request
router.post('/owners', async (req, res) => {
    try {
        let owner = new Owner();
        owner.name = req.body.name;
        owner.about = req.body.about;

        await owner.save();

        res.json({
            success: true,
            message: "Successfully created a new owner"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

//GET request
router.get('/owners', async (req, res) => {
    try {
        let owners = await Owner.find();

        res.json({
            owners: owners
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;