const multer = require("multer");

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
        console.log(req.file);
        if (type === "logo") {
            Restaurant.findByIdAndUpdate(
                id,
                {
                    $set: {
                        logo: { data: req.file.filename, contentType: "image/png" },
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
                        banner: { data: req.file.filename, contentType: "image/png" },
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
                        img: { data: req.file.filename, contentType: "image/png" },
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
