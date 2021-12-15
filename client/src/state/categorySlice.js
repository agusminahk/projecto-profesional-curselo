import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name: "category",
    initialState: {
        category: [],
    },
    reducers: {
        setCategory: (state, action) => { state.category = action.payload },
    },
})

export const { setCategory } = userSlice.actions;

export default userSlice.reducer;