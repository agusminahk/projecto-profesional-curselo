import logger from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';

export const store = configureStore({
    middleware: (mw) => mw().concat(logger),
    reducer: {
        user: userSlice
    },
});