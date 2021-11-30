const multer = require('multer');
const Restaurant = require('../models/Restaurant');

const setImage = async (req, res, next) => {
    const { id } = req.params;
    const { logo, banner, product } = req.query;
    const { name, _id } = await Restaurant.findById(id);
    const multerStorage = multer.diskStorage({
        destination: `upload/${name}_${_id}`,
        filename: (req, file, cb) => {
            cb(null, `${req.query.logo || req.query.banner || req.query.product}_${file.originalname}`);
        },
    });

    const upload = multer({
        storage: multerStorage,
    }).single('image');

    upload(req, res, (err) => {
        if (logo) {
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
        if (banner) {
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

        return next();
    });
};

module.exports = setImage;
