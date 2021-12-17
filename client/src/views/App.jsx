import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AdminHome } from "./admin/AdminHome";
import ActivateRestaurant from "../components/ActivateRestaurant";
import { NavbarAdmin } from "../components/NavbarAdmin";
import { ClientsView } from "./admin/ClientsView";
import { Settings } from "./admin/Settings";
import { Employees } from "./owner/Employees";
import { OwnerHome } from "./owner/OwnerHome";
import { EditDatos } from "./admin/EditDatos";
import { Personalizar } from "./admin/Personalizar";
import { PresentMenu } from "./PresentMenu";
import { Login } from "./Login";
import { Register } from "./Register";
import { Box } from "@chakra-ui/layout";
import { ProtectedRoutes } from "../components/ProtectedRoutes";
import { CodigoQr } from "./owner/QRCode";
import { Basket } from "./Basket";
import { EditRestaurant } from "./owner/EditRestaurant";
import { CreateRestaurant } from "./owner/CreateRestaurant";
import { StockProd } from "./admin/StockProd";
import { Menu } from "./Menu";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../state/userSlice";
import { setRestaurant } from "../state/restaurantSlice";
import { ManageCategories } from "../views/admin/ManageCategories";
import Categories from "../components/menu/Categories";
import Search from "../components/menu/Search";
import Contacts from "../components/menu/Contacts";
import { superadminAuth, adminAuth, createRestaurant, notLogged } from "../utils/authMethods";
import { setCategory } from "../state/categorySlice";
import { ProfileSuperAdmin } from "./admin/ProfileSuperAdmin";
import { AdminMetrics } from "./admin/AdminMetrics";
import { SuperadminMetrics } from "./admin/SuperadminMetrics";
import { ConfirmOrder } from "../views/admin/ConfirmOrder";
import { Cocina } from "../views/admin/Cocina";
import axios from "axios";

const App = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios({
            method: "get",
            url: "/api/auth/me",
        })
            .then(({ data }) => {
                dispatch(setUser(data));
                setLoading(false);
                if (data.restaurantId) {
                    axios({
                        method: "get",
                        url: `/api/admin/search?type=restaurant&id=${data.restaurantId}`,
                    }).then(({ data }) => dispatch(setRestaurant(data)));
                }
            })
            .then()
            .catch(() => {
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (user.restaurantId)
            axios({
                method: "get",
                url: `/api/admin/search?type=restaurant&id=${user.restaurantId}`,
            }).then(({ data }) => dispatch(setRestaurant(data)));
    }, [location.key]);

    useEffect(() => {
        axios({
            method: "get",
            url: `/api/admin/search?type=category&id=${user.restaurantId}`,
        }).then(({ data }) => dispatch(setCategory(data)));
    }, [user || location.key]);

    console.log(user);
    return (
        <Box>
            <Routes>
                <Route path="/admin/*" element={user.role ? <NavbarAdmin /> : null} />
            </Routes>
            <Routes>
                {superadminAuth(user) ? (
                    <>
                        <Route exact path="/admin/" element={<AdminHome />} />
                        <Route exact path="/admin/clientes" element={<ClientsView />} />
                        <Route exact path="/admin/editar" element={<EditDatos />} />
                        <Route exact path="/admin/ajustes" element={<Settings />} />
                        <Route path="/admin/restaurants" element={<ActivateRestaurant />} />
                        <Route path="/admin/perfil" element={<ProfileSuperAdmin />} />
                        <Route exact path="/admin/metricas" element={<SuperadminMetrics />} />
                    </>
                ) : adminAuth(user) ? (
                    <>
                        {!createRestaurant(user) ? (
                            <>
                                <Route exact path="/admin/" element={<OwnerHome />} />
                                <Route exact path="/admin/personalizar" element={<StockProd />} />
                                <Route exact path="/admin/ajustes" element={<EditRestaurant />} />
                                <Route exact path="/admin/empleados" element={<Employees />} />
                                <Route exact path="/admin/codigo" element={<CodigoQr />} />
                                <Route exact path="/admin/categories" element={<ManageCategories />} />
                                <Route exact path="/admin/metricas" element={<AdminMetrics />} />
                                <Route exact path="/admin/empleados" element={<Employees />} />
                            </>
                        ) : (
                            <Route exact path="/admin/*" element={<CreateRestaurant />} />
                        )}
                    </>
                ) : (
                    <>
                        {loading ? null : (
                            <>
                                <Route exact path="/admin/register" element={<Register />} />
                                <Route exact path="/admin/login" element={<Login />} />
                                <Route path="*" element={<Navigate to="/admin/login" />} />
                            </>
                        )}
                    </>
                )}
            </Routes>

            <Routes>
                <Route exact path="/" element={<AdminHome />} />
                <Route path="/ajustes" element={<Settings />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route exact path="/menu/:name" element={<Menu />} />
                <Route path="/empleados" element={<Employees />} />
                <Route exact path="/editar" element={<EditDatos />} />
                <Route exact path="/personalizar" element={<Personalizar />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/clientes" element={<ClientsView />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/217/cereveza-script/present" element={<PresentMenu />} />
                <Route exact path="/edit-restaurant" element={<EditRestaurant />} />
                <Route exact path="/present" element={<PresentMenu />} />
                <Route exact path="/checkout" element={<Basket />} />
                <Route path="/superadmin" element={<ActivateRestaurant />} />
                <Route path="/menu/:id/:table" element={<Menu />} />
                <Route path="/menu/search/:type/:name/:id/:table" element={<Search />} />
                <Route path="/menu/category/:id/:table" element={<Categories />} />
                <Route exact path="/menu/contact/:id/:table" element={<Contacts />} />
                <Route exact path="/menu/checkout/:id/:table" element={<Basket />} />
                <Route exact path="/product-stock" element={<StockProd />} />
                <Route exact path="/confirm-order" element={<ConfirmOrder />} />
                <Route exact path="/cocina" element={<Cocina />} />
            </Routes>
        </Box>
    );
};

export default App;
