import { useContext } from "react";
import {
  MdOutlineAddShoppingCart,
  MdRemove,
  MdOutlineModeEditOutline,
  MdOutlineDeleteOutline,
} from "react-icons/md";
import { Link } from "react-router-dom";
import { productContext } from "../../../providers/productsProvider";
import styles from "./index.module.scss";
import { motion } from "framer-motion";

export const ProductCard = ({ product }) => {
  const { addItemCart, scrollToTLocation } = useContext(productContext);

  return (
    <li className={styles.productCard__container}>
      <img src={product.image} alt={product.name} />
      <h2 className="productCard-title">{product.name}</h2>
      <p className="price sm">
        {Number(product.price).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </p>
      <div className={styles.productCard__btnContainer}>
        <button
          onClick={() => {
            addItemCart(product);
          }}
          className="btn cartIcon"
        >
          <MdOutlineAddShoppingCart size={36} />
        </button>
        <Link
          to={`/product/${product.id}`}
          className="know-more"
          onClick={() => scrollToTLocation(90)}
        >
          SAIBA MAIS
        </Link>
      </div>
    </li>
  );
};

export const ProductCardModal = ({ product }) => {
  const { removeItemCart } = useContext(productContext);

  return (
    <li className={styles.ProductCardModal__container}>
      <img src={product.image} alt={product.name} />
      <div className={styles.ProductCardModal__info}>
        <h2 className="productCard-title">{product.name}</h2>
        <div className={styles.ProductCardModal__counter}>
          <p>
            {product.price.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
          {product.count > 1 && (
            <p
              className={styles.ProductCardModal__counter}
            >{`x ${product.count}`}</p>
          )}
        </div>
      </div>
      <button onClick={() => removeItemCart(product)}>
        <MdRemove size={30} />
      </button>
    </li>
  );
};

export const ProductCardAdminView = ({ product }) => {
  const { setEditingProduct, setDeleteItemModal } = useContext(productContext);
  return (
    <li className={styles.ProductCardAdminView__container}>
      <img src={product.image} alt={product.name} />
      <div className={styles.ProductCardAdminView__info}>
        <h2>{product.name}</h2>
        <p>
          {Number(product.price).toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
      </div>
      <div className={styles.ProductCardAdminView__Btncontainer}>
        <MdOutlineModeEditOutline
          onClick={() => {
            setEditingProduct(product);
          }}
          size={28}
          className={styles.icon}
        />
        <MdOutlineDeleteOutline
          onClick={() => setDeleteItemModal(product)}
          size={28}
          className={styles.icon}
        />
      </div>
    </li>
  );
};
