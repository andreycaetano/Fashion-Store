import { LiaPlusCircleSolid } from "react-icons/lia";
import { ProductCardAdminView } from "../../../components";
import { Link } from "react-router-dom";
import {
  RegisterProductModal,
  UpdateProductModal,
  ConfirmDeleteModal,
} from "../../../components";
import { useContext, useEffect } from "react";
import { productContext } from "../../../providers/productsProvider";
import { api } from "../../../services/api";
import styles from "./index.module.scss";

export const ProductsListAdminView = () => {
  const {
    deleteItemModal,
    createProduct,
    setCreateProduct,
    editingProduct,
    listProduct,
    setListProduct,
  } = useContext(productContext);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await api.get("/products");
        setListProduct(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
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
      <section className={styles.admin__panel}>
        <div className={styles.productsSection__header}>
          <div className={styles.title__container}>
            <h1 className="title-2">PRODUTOS</h1>
            <p className="paragraph">Gerencie os produtos do catálogo</p>
          </div>

          <button
            onClick={() => setCreateProduct(true)}
            className="btn newProduct"
          >
            <LiaPlusCircleSolid size={30} /> NOVO PRODUTO{" "}
          </button>
        </div>
        <ul className={styles.productList__container}>
          {listProduct?.map((product) => {
            return <ProductCardAdminView product={product} key={product.id} />;
          })}
        </ul>
      </section>
      {createProduct && <RegisterProductModal />}
      {editingProduct && <UpdateProductModal />}
      {deleteItemModal && <ConfirmDeleteModal />}
    </>
  );
};
