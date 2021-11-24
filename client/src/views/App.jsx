import React from 'react';
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";
import { AdminHome } from "./admin/AdminHome"
import { NavbarAdmin } from '../components/admin/NavbarAdmin';
import { ClientsView } from "./admin/ClientsView"

const App = () => {
    return (
        <>
            <NavbarAdmin />
            <Routes>
                <Route exact path="/" element={<AdminHome />}/>
                <Route exact path="/clientes" element={<ClientsView />}/>
            </Routes>
        </>
    )
};

export default App;
