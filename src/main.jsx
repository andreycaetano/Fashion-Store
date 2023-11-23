import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { LoginProvider } from "./providers/loginProvider.jsx";
import { ProductProvider } from "./providers/productsProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <BrowserRouter>
    <LoginProvider>
      <ProductProvider>
        <App />
      </ProductProvider>
    </LoginProvider>
  </BrowserRouter>,
  // </React.StrictMode>,
);
