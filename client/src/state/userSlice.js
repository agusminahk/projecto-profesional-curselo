import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {},
        metrics: [],
    },
    reducers: {
        setUser: (state, action) => { state.user = action.payload },
        logoutUser: (state, action) => { state.user = {} },
        setMetrics:  (state, action) => { state.metrics = action.payload },
    }
})

export const { setUser, logoutUser, setMetrics } = userSlice.actions;

export default userSlice.reducer;