import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AdminHome } from './admin/AdminHome';
import ActivateRestaurant from '../components/ActivateRestaurant';
import { NavbarAdmin } from '../components/NavbarAdmin';
import { ClientsView } from './admin/ClientsView';
import { NewClient } from './admin/NewClient';
import { Profile } from './Profile';
import { Settings } from './admin/Settings';
import { Employees } from './owner/Employees';
import { OwnerHome } from './owner/OwnerHome';
import { EditDatos } from './admin/EditDatos';
import { Personalizar } from './admin/Personalizar';
import { PresentMenu } from './PresentMenu';
import { Login } from './Login';
import { Register } from './Register';
import { Box } from '@chakra-ui/layout';
import { ProductsList } from '../components/menu/ProductsList';
import { Carrito } from './Carrito';
import { EditRestaurant } from './owner/EditRestaurant';
import { CreateRestaurant } from './owner/CreateRestaurant';
import { StockProd } from './admin/StockProd';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../state/userSlice';
import { setRestaurant } from '../state/restaurantSlice';
import axios from 'axios';

const App = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.user);

    const [loading, setLoading] = useState(true);

    console.log('app loaded');

    useEffect(() => {
        axios({
            method: 'get',
            url: '/api/auth/me',
        })
            .then(({ data }) => {
                dispatch(setUser(data));
                setLoading(false);
                if (data.restaurantId)
                    axios({
                        method: 'get',
                        url: `/api/admin/search?type=restaurant&id=${data.restaurantId}`,
                    }).then(({ data }) => dispatch(setRestaurant(data)));
            })
            .then()
            .catch(() => {
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (user.restaurantId)
            axios({
                method: 'get',
                url: `/api/admin/search?type=restaurant&id=${user.restaurantId}`,
            }).then(({ data }) => dispatch(setRestaurant(data)));
    }, [location.key]);

    return (
        <Box>
            {}
            {user.role ? <NavbarAdmin /> : null}
            <Routes>
                {user.role === 'superadmin' ? (
                    <>
                        <Route exact path="/admin/" element={<AdminHome />} />
                        <Route exact path="/admin/clientes" element={<ClientsView />} />
                        <Route exact path="/admin/editar" element={<EditDatos />} />
                        <Route exact path="/admin/ajustes" element={<Settings />} />
                        <Route path="/admin/restaurants" element={<ActivateRestaurant />} />
                    </>
                ) : user.role === 'admin' ? (
                    <>
                        {user.restaurantId ? (
                            <>
                                <Route exact path="/admin/" element={<OwnerHome />} />
                                <Route exact path="/admin/personalizar" element={<Personalizar />} />
                                <Route exact path="/admin/ajustes" element={<EditRestaurant />} />
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
                {/* <Route path="/productos" element={ < />}/> */}
                <Route exact path="/" element={<AdminHome />} />
                <Route path="/ajustes" element={<Settings />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/empleados" element={<Employees />} />
                <Route path="/217/cerveza-script" element={<ProductsList />} />
                <Route exact path="/editar" element={<EditDatos />} />
                <Route exact path="/personalizar" element={<Personalizar />} />
                <Route exact path="/login" element={<Login />} />
                <Route exact path="/clientes" element={<ClientsView />} />
                <Route exact path="/register" element={<Register />} />
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
