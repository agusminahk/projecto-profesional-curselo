const multer = require("multer");
const fs = require("fs");
const Restaurant = require("../models/Restaurant");
const Product = require("../models/Product");
const sharp = require("sharp");

const setImage = async (req, res, next) => {
    const { id } = req.params;
    const { type, key } = req.query;

    const { name, _id } = await Restaurant.findById(id);
    const multerStorage = multer.diskStorage({
        destination: `upload/${name}_${_id}`,
        filename: (req, file, cb) => {
            cb(null, `${type || ""}_${file.originalname}`);
        },
    });

    const upload = multer({
        storage: multerStorage,
    }).single("image");

    const helperImg = (filePath, fileName, size = 300) => {
        return sharp(filePath).resize(size, size).toFile(`upload/resize-${fileName}`);
    };

    upload(req, res, async (err) => {
        await helperImg(req.file.path, req.file.filename, 200);

        const img = fs.readFileSync(`upload/resize-${req.file.filename}`);
        const encode_image = img.toString("base64");

        const finalImg = { contentType: req.file.mimetype, image: Buffer.from(encode_image, "base64") };

        if (type === "logo") {
            res.locals.data = await Restaurant.findByIdAndUpdate(
                id,
                {
                    $set: {
                        logo: { data: finalImg.image, contentType: finalImg.contentType },
                    },
                },
                { new: true }
            );
        }
        if (type === "banner") {
            res.locals.data = await Restaurant.findByIdAndUpdate(
                id,
                {
                    $set: {
                        banner: { data: finalImg.image, contentType: finalImg.contentType },
                    },
                },
                { new: true }
            );
        }

        if (type === "product") {
            await Product.findOneAndUpdate(
                { _id: key },
                {
                    $set: {
                        img: { data: finalImg.image, contentType: finalImg.contentType },
                    },
                },
                { new: true }
            );
            res.locals.data = await Product.find({ restaurantId: id }).populate("category", { name: 1 });
        }

        if (type === "productUpdate") {
            res.locals.data = await Product.findOneAndUpdate(
                { _id: key },
                {
                    $set: {
                        img: { data: finalImg.image, contentType: finalImg.contentType },
                    },
                },
                { new: true }
            );
        }

        return next();
    });
};

module.exports = setImage;
