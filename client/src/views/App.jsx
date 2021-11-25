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
import { NewClient } from './admin/NewClient';
import { Profile } from './Profile';
import { Settings } from "./admin/Settings";

const App = () => {
    return (
        <div style={{backgroundColor: "#FFF", height: "100vh"}}>
            <NavbarAdmin />
            <Routes>
                <Route exact path="/" element={<AdminHome />} />
                <Route exact path="/clientes" element={<ClientsView />} />
                <Route exact path="/nuevousuario" element={<NewClient />} />
                <Route exact path="/perfil" element={<Profile/>} />
                <Route exact path="/ajustes" element={<Settings />} />
            </Routes>
        </div>
    )
};

export default App;
