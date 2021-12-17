export const deleteProduct = (id, table, setState) => {
    const carrito = JSON.parse(localStorage.getItem("basket")) || { table: table, products: [], total: 0 };

    const idx = carrito.products.findIndex((e) => e._id === id);

    carrito.products.splice(idx, 1);

    localStorage.setItem("basket", JSON.stringify(carrito));

    setState && setState(carrito.products);

    return carrito.products;
};

export const updateProduct = (id, cant, table, setState) => {
    const carrito = JSON.parse(localStorage.getItem("basket")) || { table: table, products: [], total: 0 };

    const idx = carrito.products.findIndex((e) => e._id === id);

    carrito.products[idx].units = cant;

    localStorage.setItem("basket", JSON.stringify(carrito));

    setState && setState(carrito.products);

    return carrito.products;
};

export const addProduct = (prod, table, setState) => {
    const carrito = JSON.parse(localStorage.getItem("basket")) || { table: table, products: [], total: 0 };

    if (carrito.products.length === 0) {
        carrito.products.push({
            name: prod.name,
            units: prod.units || 1,
            _id: prod._id,
            priceByUnit: prod.price,
        });
        localStorage.setItem("basket", JSON.stringify(carrito));
        setState && setState(carrito.products);
    } else {
        const exists = carrito.products.filter((e) => e._id === prod._id);
        if (exists.length === 0) {
            carrito.products.push({
                name: prod.name,
                units: prod.units || 1,
                _id: prod._id,
                priceByUnit: prod.price,
            });
            localStorage.setItem("basket", JSON.stringify(carrito));
            setState && setState(carrito.products);
        }
    }

    return carrito;
};
