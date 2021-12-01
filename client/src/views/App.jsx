import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AdminHome } from "./admin/AdminHome";
import ActivateRestaurant from "../components/ActivateRestaurant";
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
import { Login } from "./Login";
import { Register } from "./Register";
import { Box } from "@chakra-ui/layout";
import { ProductsList } from "../components/menu/ProductsList";
import { EditRestaurant } from "../views/admin/EditRestaurant";
import { StockProd } from "../views/admin/StockProd";
import { Carrito } from "./Carrito";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
    const location = useLocation();

    const user = useSelector((state) => state.user);

    return (
        <Box>
            {location.pathname.split("")[1] == 2 ? null : <NavbarAdmin />}
            {user.role ? (
                user.role === "Superadmin" ? (
                    <>SuperAdmin</>
                ) : (
                    <>Employee/owner</>
                )
            ) : (
                // El usuario no esta logeado
                <>Login</>
            )}
            <Routes>
                <Route exact path="/owner" element={<OwnerHome />} />
                {/* <Route path="/productos" element={ < />}/> */}
                <Route exact path="/" element={<AdminHome />} />
                <Route path="/ajustes" element={<Settings />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/empleados" element={<Employees />} />
                <Route path="/217/cerveza-script" element={<ProductsList />} />
                <Route exact path="/editar" element={<EditDatos />} />
                <Route exact path="/personalizar" element={<Personalizar />} />
                <Route exact path="/217/cereveza-script/present" element={<PresentMenu />} />
                <Route exact path="/edit-restaurant" element={<EditRestaurant />} />
                <Route exact path="/product-stock" element={<StockProd />} />
                <Route exact path="/present" element={<PresentMenu />} />
                <Route exact path="/checkout" element={<Carrito />} />
                <Route path="/superadmin" element={<ActivateRestaurant />} />
            </Routes>
        </Box>
    );
};

export default App;
