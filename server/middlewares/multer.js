const multer = require("multer");
const fs = require("fs");
const Restaurant = require("../models/Restaurant");
const Product = require("../models/Product");

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

    upload(req, res, (err) => {
        const img = fs.readFileSync(req.file.path);
        const encode_image = img.toString("base64");

        const finalImg = { contentType: req.file.mimetype, image: new Buffer(encode_image, "base64") };

        if (type === "logo") {
            Restaurant.findByIdAndUpdate(
                id,
                {
                    $set: {
                        logo: { data: finalImg.image, contentType: finalImg.contentType },
                    },
                },
                { new: true }
            )
                .then(() => next())
                .catch((err) => console.log(err));
        }
        if (type === "banner") {
            Restaurant.findByIdAndUpdate(
                id,
                {
                    $set: {
                        banner: { data: finalImg.image, contentType: finalImg.contentType },
                    },
                },
                { new: true }
            )
                .then(() => next())
                .catch((err) => console.log(err));
        }

        if (type === "product") {
            Product.findOneAndUpdate(
                { _id: key },
                {
                    $set: {
                        img: { data: finalImg.image, contentType: finalImg.contentType },
                    },
                },
                { new: true }
            )
                .then(() => next())
                .catch((err) => console.log(err));
        }

        return next();
    });
};

module.exports = setImage;
