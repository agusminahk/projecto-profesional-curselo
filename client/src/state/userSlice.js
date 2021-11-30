import { createSlice } from "@reduxjs/toolkit"

export const userSlice = createSlice({
    name: "user",
    initialState: {
        user: {
            default: "true"
        }
    },
    reducers: {
        setUser: (state, action) => action.payload,
        logoutUser: (state, action) => {},
    }
})

export const { setUser, logoutUser } = userSlice.actions;

export default userSlice.reducer;