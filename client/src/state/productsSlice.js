import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name: "products",
    initialState: {
        products: []
    },
    reducers: {
        setProducts: (state, action) => { state.products = action.payload },
    }
})

export const { setProducts } = userSlice.actions;

export default userSlice.reducer;