const router = require("express").Router();
const cloudinary = require("cloudinary");
const fs = require("fs");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Helper to remove temp file
const removeTemp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};

// @route   POST /upload
// @desc    Upload image to Cloudinary
router.post("/upload", async (req, res) => {
  try {
    console.log("File upload:", req.files);

    if (!req.files || Object.keys(req.files).length === 0) {
      return res.status(400).json({ msg: "No files uploaded" });
    }

    const file = req.files.file;

    // Validate file size (1MB max)
    if (file.size > 1024 * 1024) {
      removeTemp(file.tempFilePath);
      return res
        .status(400)
        .json({ msg: "File size too large. Max 1MB allowed." });
    }

    // Validate file type
    if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
      removeTemp(file.tempFilePath);
      return res
        .status(400)
        .json({ msg: "Invalid file format. Only JPEG and PNG allowed." });
    }

    // Upload to Cloudinary
    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      { folder: "Portfolio" },
      (err, result) => {
        if (err) throw err;

        removeTemp(file.tempFilePath);
        res.json({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
    );
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// @route   POST /destroy
// @desc    Delete image from Cloudinary
router.post("/destroy", (req, res) => {
  const { public_id } = req.body;

  try {
    if (!public_id) {
      return res.status(400).json({ msg: "No image selected!" });
    }

    cloudinary.v2.uploader.destroy(public_id, (err, result) => {
      if (err) throw err;
      res.json({ msg: "Image deleted successfully!" });
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
