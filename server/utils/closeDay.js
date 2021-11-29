const closeDay = (arr, obj = {}, sum = 0) => {
    arr.map((e) => (sum += e.total));

    arr.map((e) => {
        e.products.map((p) => {
            if (obj[p._id]) {
                obj[p._id].units += p.units;
            } else {
                obj[p._id] = { _id: p._id, units: p.units };
            }
        });
    });

    const products = Object.values(obj);

    return { products, total: sum, paymentMethod: [] };
};

module.exports = closeDay;
