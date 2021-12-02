import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name: "restaurant",
    initialState: {
        restaurant: {}
    },
    reducers: {
        setRestaurant: (state, action) => { state.restaurant = action.payload },
        deleteRestaurant: (state, action) => { state.restaurant = {} },
    }
})

export const { setRestaurant, deleteRestaurant } = userSlice.actions;

export default userSlice.reducer;