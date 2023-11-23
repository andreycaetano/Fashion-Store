import { Route, Routes } from "react-router-dom";
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ProductPage,
  Dashboard,
  ProductsListAdminView,
} from "../pages";
import { PrivateRoutes } from "../components/privateRoutes";

export const MainRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/dashboard" element={<PrivateRoutes />}>
        <Route index element={<Dashboard />} />
      </Route>
      <Route path="/dashboard/products" element={<PrivateRoutes />}>
        <Route index element={<ProductsListAdminView />} />
      </Route>
      <Route path="/product/:id" element={<ProductPage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
};
