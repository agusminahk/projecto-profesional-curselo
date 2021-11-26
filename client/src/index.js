import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { store } from './state/store';

import './components/firebase/firebase-config'
import App from './views/App.jsx';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <ChakraProvider>
                <App />
            </ChakraProvider>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
