const closeDay = (arr, obj = {}, sum = 0) => {
    arr.map((e) => (sum += e.total));

    arr.products.map((e) => {
        if (obj[e._id]) {
            obj[e._id].units += e.units;
        } else {
            obj[e._id] = { _id: e._id, units: e.units };
        }
    });

    const products = Object.values(obj);

    return { products, total: sum, paymentMethod: [] };
};

module.exports = closeDay;
