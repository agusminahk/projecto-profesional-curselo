import React from 'react';
import {
    Routes,
    Route,
    useLocation
  } from "react-router-dom";
import { AdminHome } from "./admin/AdminHome"
  import ActivateRestaurant from '../components/ActivateRestaurant';
import { NavbarAdmin } from '../components/NavbarAdmin';
import { ClientsView } from "./admin/ClientsView"
import { NewClient } from './admin/NewClient';
import { Profile } from './Profile';
import { Settings } from "./admin/Settings";
import { Employees } from "./owner/Employees";
import { OwnerHome } from "./owner/OwnerHome";
import { EditDatos } from "./admin/EditDatos";
import { Personalizar } from "./admin/Personalizar";
import { PresentMenu } from "./PresentMenu";
import { Login } from "./Login";
import { Register } from "./Register";
import { Box } from '@chakra-ui/layout';
import { ProductsList } from '../components/menu/ProductsList';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUser } from "../state/userSlice";
import axios from "axios"

const App = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.user)

    console.log("app loaded")
    
    if (!user.role) {
        // Va a buscar al back
        axios({
            method: "get",
            url: "/api/auth/me"
        })
        .then(({ data }) => dispatch(setUser(data)))
        .catch(() => {})
    } 

    return (
        <Box>
            {
                user.role ?  <NavbarAdmin /> : null
            }
            <Routes>
                {
                    user.role === "superadmin" ? (
                    <>
                        <Route exact path="/admin/" element={ <AdminHome /> }/>
                        <Route exact path="/admin/clientes" element={<ClientsView />} />
                        <Route exact path="/admin/editar" element={<EditDatos />} />
                        <Route exact path="/admin/ajustes" element={ <Settings /> }/>
                    </>
                    ) : user.role === "admin" ? (
                    <>
                        {
                            user.restaurantId ? (
                                <>
                                    <Route exact path="/admin/" element={ <OwnerHome />}/>
                                    <Route exact path="/admin/personalizar" element={<Personalizar />}/>
                                    <Route exact path="/admin/ajustes" element={ <Settings /> }/>
                                    <Route exact path="/admin/empleados" element={ <Employees /> }/>
                                </>
                            ) : (
                                console.log("crear restaurant")
                            )
                        }
                    </>
                    ) : (
                    <>
                        <Route exact path="/admin/register" element={ <Register /> }/>
                        <Route exact path="/admin/*" element={ <Login />}/>
                    </>
                    )
                }
            </Routes>
            
            {/* <Routes>
                {/* <Route path="/productos" element={ < />}/> }
                <Route exact path="/" element={ <AdminHome /> }/>
                <Route path="/ajustes" element={ <Settings /> }/>
                <Route path="/empleados" element={ <Employees /> }/>
                <Route path="/217/cerveza-script" element={ <ProductsList /> }/>
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
            </Routes> */}
        </Box>
    );
};

export default App;
