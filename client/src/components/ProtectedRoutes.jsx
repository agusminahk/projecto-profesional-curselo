import { Outlet, Navigate } from "react-router-dom"

export const ProtectedRoutes = ({ user }) => {
    console.log("authMeth", user._id !== undefined && user.role === "admin", user)
    return user._id !== undefined ? <Outlet /> : <Navigate to="/admin/login" />;
}