import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoutes = () => {
  const [auth, setAuth] = useState({});
  useEffect(() => {
    const permission = JSON.parse(localStorage.getItem("@FSToken"));
    setAuth(permission);
  }, []);
  return auth ? <Outlet /> : <Navigate to="/" />;
};
