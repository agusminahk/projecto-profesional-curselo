import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name: "restaurant",
    initialState: {
        restaurant: {},
        users:[],
    },
    reducers: {
        setRestaurant: (state, action) => { state.restaurant = action.payload },
        deleteRestaurant: (state, action) => { state.restaurant = {} },
        setUsers: (state, action) => {state.users = action.payload},
    }
})

export const { setRestaurant, deleteRestaurant, setUsers } = userSlice.actions;

export default userSlice.reducer;

