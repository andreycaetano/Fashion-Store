import { ToastContainer } from "react-toastify";
import { DefaultTemplate } from "./components/index.js";
import { MainRoutes } from "./routes/index.jsx";
import "./styles/index.scss";

const App = () => {
  return (
    <>
      <DefaultTemplate>
        <ToastContainer autoClose={1000} />
        <MainRoutes />
      </DefaultTemplate>
    </>
  );
};

export default App;
