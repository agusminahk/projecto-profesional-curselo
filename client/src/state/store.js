import logger from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import restaurantSlice from './restaurantSlice';
import categorySlice from './categorySlice'

export const store = configureStore({
    middleware: (mw) => mw().concat(logger),
    reducer: {
        user: userSlice,
        restaurant: restaurantSlice,
        category: categorySlice,
    },
});