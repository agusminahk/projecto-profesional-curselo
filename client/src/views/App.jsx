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
import { Employees } from './owner/Employees';

const App = () => {
    return (
        <div style={{backgroundColor: "#FFF", height: "100vh"}}>
            <NavbarAdmin />
            <Routes>
                <Route exact path="/" element={<AdminHome />} />
                <Route path="/clientes" element={<ClientsView />} />
                <Route path="/nuevousuario" element={<NewClient />} />
                <Route path="/perfil" element={<Profile/>} />
                <Route path="/ajustes" element={<Settings />} />
                <Route path="/empleados" element={<Employees />} />
            </Routes>
        </div>
    )
};

export default App;
