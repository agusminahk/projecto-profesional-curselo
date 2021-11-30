const multer = require('multer');

const Restaurant = require('../models/Restaurant');
const Product = require('../models/Product');

const setImage = async (req, res, next) => {
    const { id } = req.params;
    const { logo, banner, product } = req.query;

    const { name, _id } = await Restaurant.findById(id);
    const multerStorage = multer.diskStorage({
        destination: `upload/${name}_${_id}`,
        filename: (req, file, cb) => {
            cb(null, `${logo || banner || product || ''}_${file.originalname}`);
        },
    });

    const upload = multer({
        storage: multerStorage,
    }).single('image');

    upload(req, res, (err) => {
        if (logo === 'logo') {
            Restaurant.findByIdAndUpdate(
                id,
                {
                    $set: {
                        logo: { data: req.file.filename, contentType: 'image/png' },
                    },
                },
                { new: true }
            )
                .then(() => next())
                .catch((err) => console.log(err));
        }
        if (banner === 'banner') {
            Restaurant.findByIdAndUpdate(
                id,
                {
                    $set: {
                        banner: { data: req.file.filename, contentType: 'image/png' },
                    },
                },
                { new: true }
            )
                .then(() => next())
                .catch((err) => console.log(err));
        }

        if (product === 'product') {
            Product.findOneAndUpdate(
                { restaurantId: id },
                {
                    $set: {
                        img: { data: req.file.filename, contentType: 'image/png' },
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
