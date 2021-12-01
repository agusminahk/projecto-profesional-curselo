import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { store } from './state/store';

<<<<<<< HEAD
/* import './components/firebase/firebase-config' */
=======
>>>>>>> a4af373465d0b306e1bd6a59e8475d8c5c2f0177
import App from './views/App.jsx';

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <ChakraProvider>
                <App/>
            </ChakraProvider>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);
