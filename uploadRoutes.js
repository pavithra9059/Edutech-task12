const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const cloudinary = require("../config/cloudinary");

router.post(
    "/upload",
    upload.single("image"),
    async (req, res) => {

        try {

            if (!req.file) {
                return res.status(400).json({
                    success: false,
                    message: "No file uploaded"
                });
            }

            const fileString =
                `data:${req.file.mimetype};base64,${
                    req.file.buffer.toString("base64")
                }`;

            const result =
                await cloudinary.uploader.upload(
                    fileString,
                    {
                        folder: "internship_uploads"
                    }
                );

            res.status(200).json({
                success: true,
                message:
                "Image uploaded successfully",
                imageUrl: result.secure_url
            });

        } catch (error) {

            res.status(500).json({
                success: false,
                message: error.message
            });
        }
    }
);

module.exports = router;
