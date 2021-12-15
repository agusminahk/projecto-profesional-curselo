import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name: "restaurant",
    initialState: {
        restaurant: {},
        users:[],
        metrics: [],
    },
    reducers: {
        setRestaurant: (state, action) => { state.restaurant = action.payload },
        deleteRestaurant: (state, action) => { state.restaurant = {} },
        setUsers: (state, action) => {state.users = action.payload},
        setMetrics: (state, action) => {state.metrics = action.payload}
    }
})

export const { setRestaurant, deleteRestaurant, setUsers, setMetrics } = userSlice.actions;

export default userSlice.reducer;