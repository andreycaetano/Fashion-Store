import { MdOutlineShoppingCart } from "react-icons/md";
import { TbLogout2 } from "react-icons/tb";
import logoImg from "../../assets/FAshionSTORE.png";
import { useContext } from "react";
import { productContext } from "../../providers/productsProvider";
import styles from "./style.module.scss";
import { useNavigate } from "react-router-dom";

export const AppHeader = () => {
  const { setCartIsOpen, cartCounter } = useContext(productContext);
  const pathname = window.location.pathname;

  const navigate = useNavigate();

  const divClassName =
    pathname === "/" ||
    (pathname.includes("/product/") && pathname !== "/dashboard/products")
      ? `${styles.div} ${styles.spaceBtw}`
      : `${styles.div}`;

  const backToHome = () => {
    navigate("/");
  };

  const goToLoginPage = () => {
    navigate("/login");
  };

  return (
    <header
      className={`${styles.header} ${
        pathname === "/dashboard/products" && styles.dashboardPag
      }`}
    >
      <div className={divClassName}>
        <img onClick={backToHome} src={logoImg} alt="fashion logo" />
        <div className={styles.icons__headerContainer}>
          {pathname === "/" ||
          (pathname.includes("/product") &&
            pathname != "/dashboard/products") ? (
            <div className={styles.icons__div}>
              <button onClick={goToLoginPage}>
                <TbLogout2 size={25} />
              </button>
              <button onClick={() => setCartIsOpen(true)}>
                <MdOutlineShoppingCart size={30} />
              </button>
            </div>
          ) : null}
          {(cartCounter != 0 && pathname === "/") ||
          pathname.includes("product/") ? (
            <span>{`${cartCounter}`}</span>
          ) : null}
        </div>
      </div>
    </header>
  );
};
