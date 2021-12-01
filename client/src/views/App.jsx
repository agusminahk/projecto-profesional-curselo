import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AdminHome } from "./admin/AdminHome";
import { NavbarAdmin } from "../components/admin/NavbarAdmin";
import { ClientsView } from "./admin/ClientsView";
import { NewClient } from "./admin/NewClient";
import { Profile } from "./Profile";
import { Settings } from "./admin/Settings";
import { Employees } from "./owner/Employees";
import { OwnerHome } from "./owner/OwnerHome";
import { EditDatos } from "./admin/EditDatos";
import { Personalizar } from "./admin/Personalizar";
import { PresentMenu } from "./PresentMenu";
import { Box } from "@chakra-ui/layout";
import { ProductsList } from "../components/menu/ProductsList";
import { Carrito } from "./Carrito";

const App = () => {
  const location = useLocation();

  return (
    <Box>
      {/* {location.pathname.split("")[1] == 2 ? null : <NavbarAdmin />} */}
      <Routes>
        <Route exact path="/" element={<AdminHome />} />
        <Route exact path="/owner" element={<OwnerHome />} />
        <Route path="/clientes" element={<ClientsView />} />
        <Route path="/nuevousuario" element={<NewClient />} />
        <Route path="/perfil" element={<Profile />} />
        <Route path="/ajustes" element={<Settings />} />
        <Route path="/empleados" element={<Employees />} />
        <Route path="/217/cerveza-script" element={<ProductsList />} />
        <Route exact path="/editar" element={<EditDatos />} />
        <Route exact path="/personalizar" element={<Personalizar />} />
        <Route exact path="/present" element={<PresentMenu />} />
        <Route exact path="/checkout" element={<Carrito />} />
      </Routes>
    </Box>
  );
};
export default App;
