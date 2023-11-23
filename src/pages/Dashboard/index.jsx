import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./style.module.scss";

export const Dashboard = () => {
  const [adminData, setAdminData] = useState({});
  useEffect(() => {
    const getAdminData = () => {
      const adminData = JSON.parse(localStorage.getItem("@FSAdmin"));
      setAdminData(adminData);
    };
    getAdminData();
  }, []);

  return (
    <>
      <nav className={styles.nav__container}>
        <ul>
          <Link to={"/dashboard"}>
            <li className="navigation-title sm">INÍCIO</li>
          </Link>
          <Link to={"/dashboard/products"}>
            <li className="navigation-title sm">PRODUTOS</li>
          </Link>
        </ul>
      </nav>
      <section className={styles.admin__welcome}>
        <div className={styles.title__container}>
          <h1 className="title-2">PAINEL DO ADMINISTRADOR</h1>
          <p className="paragraph">Seja bem vindo, {`${adminData}`}</p>
        </div>
      </section>
    </>
  );
};
