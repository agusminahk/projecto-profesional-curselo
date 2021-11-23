import logger from 'redux-logger';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
    middleware: (mw) => mw().concat(logger),
    reducer: {},
});
