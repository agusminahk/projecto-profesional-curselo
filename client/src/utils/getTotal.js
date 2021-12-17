export const getTotal = (arr) => {
    const array = [];
    arr.map((e) => array.push(e.units * e.priceByUnit));
    return array.reduce((a, c) => a + c);
};
