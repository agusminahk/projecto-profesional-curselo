export const superadminAuth = (user) => user._id !== undefined && user.role === "superadmin"
export const adminAuth = (user) => user._id !== undefined && user.role === "admin"
// Si esta logeado y no tiene restaurant
export const createRestaurant = (user) => user._id !== undefined && user.role ==="admin" && user.restaurantId === undefined
export const notLogged = (user) => user._id === undefined
// hola