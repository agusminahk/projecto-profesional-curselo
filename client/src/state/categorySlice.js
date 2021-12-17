import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name: "category",
    initialState: {
        category: [],
        products: [],
    },
    reducers: {
        setCategory: (state, action) => { state.category = action.payload },
        setProducts: (state, action) => { state.products = action.payload },
    },
})

export const { setCategory, setProducts } = userSlice.actions;

export default userSlice.reducer;