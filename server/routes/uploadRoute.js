const router = require('express').Router();
const cloudinary = require('cloudinary');
const fs = require('fs');

// Upload image to cloudinary routes
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});

//Post Upload Image
router.post('/upload', async(req, res) => {
    try {
        console.log("file upload::", req.files);
        
        if(!req.files || Object.keys(req.files)=== 0) return res.status(400).send('no files uploaded');
        
        const file = req.files.file;
        if(file.size > 1024*1024) {
            removeTemp(file.tempFilePath);
            return res.status(400).json({msg: 'File size is too big'})
        }

        if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
            removeTemp(file.tempFilePath);
            return res.status(400).json({msg: 'Incorrect file format'})
        }

        cloudinary.v2.uploader.upload(file.tempFilePath, {folder: "Portfolio"},
            async(err, result) => {
                if(err) throw err;

                removeTemp(file.tempFilePath);
                res.json({public_id: result.public_id, url: result.secure_url});
            })

    } catch (err) {
        res.status(500).json({msg: err.message});
    }
})

//Delete image
router.post('/destroy', (req, res) => {
    const {public_id} = req.body;
    try {
        if(!public_id) return res.status(400).json({msg: 'no images selected!'});

        cloudinary.v2.uploader.destroy(public_id, async(err, result) => {
            if(err) throw err;
            res.json({msg: 'image is deleted!'})
        })
    } catch (err) {
        res.status(500).json({msg: err.message});
    }
})

const removeTemp = (path) => {
    fs.unlink(path, err => {
        if(err) throw err;
    })
}

module.exports = router;