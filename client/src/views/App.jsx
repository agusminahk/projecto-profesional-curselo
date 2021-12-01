import React from 'react';
import { Routes, Route } from 'react-router-dom';

import ActivateRestaurant from '../components/ActivateRestaurant';

const App = () => {
    return (
        <Routes>
            <Route path="/superadmin" element={<ActivateRestaurant />} />
        </Routes>
    );
};
export default App;
