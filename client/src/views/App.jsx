import React from 'react';
import { AdminHome } from './admin/AdminHome';
import { NavbarAdmin } from '../components/admin/NavbarAdmin';

const App = () => {
    return (
        <>
            <NavbarAdmin />
            <AdminHome />
        </>
    )
};

export default App;
