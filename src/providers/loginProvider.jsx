import { createContext, useState } from "react";
import { api } from "../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const loginContext = createContext({});

export const LoginProvider = ({ children }) => {
  const navigate = useNavigate();

  const getAutoLogin = async () => {
    const user = localStorage.getItem("@FSToken");
    if (user) {
      try {
        const { data } = await api.get(`/users/${user.user.id}`, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        });
        navigate("/dashboard");
      } catch (error) {
        console.log(error);
        localStorage.removeItem("@FSToken");
      }
    }
  };

  const login = async (formData) => {
    try {
      const { data } = await api.post("/login", formData);
      localStorage.setItem("@FSToken", JSON.stringify(data.accessToken));
      localStorage.setItem("@FSAdmin", JSON.stringify(data.user.name));
      toast.success("Login realizado com sucesso!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Crêdenciais inválidas!");
      console.log(error);
    }
  };

  const logout = () => {
    localStorage.removeItem("@FSToken");
    navigate("/");
  };

  const createUser = async (formData) => {
    try {
      await api.post("/users", formData);
      toast.success("Usuario criado com sucesso");
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error("Algo deu errado");
    }
  };

  return (
    <loginContext.Provider
      value={{
        getAutoLogin,
        login,
        logout,
        createUser,
      }}
    >
      {children}
    </loginContext.Provider>
  );
};
