import { MdOutlineAddShoppingCart } from "react-icons/md";
import { CartModal, ProductCard } from "../../components";
import { useContext, useEffect, useState } from "react";
import { productContext } from "../../providers/productsProvider";
import { Link, useParams } from "react-router-dom";
import { api } from "../../services/api";
import styles from "./style.module.scss";
import { useAnimate } from "framer-motion";

export const ProductPage = () => {
  const { cartIsOpen, listProduct, addItemCart, scrollToTLocation } =
    useContext(productContext);
  const [currProduct, setCurrProduct] = useState({});
  const [hightLights, setHighLights] = useState([]);
  const [scope, animate] = useAnimate();

  const { id } = useParams();

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const { data } = await api.get(`/products/${id}`);
        setCurrProduct(data);
      } catch (error) {
        console.err(error);
      }

      animate(
        "img",
        { x: [-300, 0], opacity: [0, 0.5, 1] },
        { delay: 0.1, type: "spring", stiffness: 50 },
      );

      animate(
        "h2",
        { x: [300, 0], opacity: [0, 1] },
        { delay: 0.2, duration: 0.6, type: "spring", stiffness: 50 },
      );

      animate(
        "p",
        { x: [300, 0], opacity: [0, 1] },
        { delay: 0.4, duration: 0.7, type: "spring", stiffness: 50 },
      );

      animate(
        "span",
        { x: [300, 0], opacity: [0, 1] },
        { delay: 0.3, duration: 0.8, type: "spring", stiffness: 50 },
      );

      const animateDiv = document.querySelector("#cartBtn");

      animate(
        animateDiv,
        { x: [300, 0], opacity: [0, 1] },
        { delay: 0.5, duration: 0.9, type: "spring", stiffness: 50 },
      );
    };

    loadProduct();
  }, [id]);

  useEffect(() => {
    const filteredList = listProduct?.filter(
      (product) => product.id !== Number(id),
    );
    setHighLights(filteredList);
  }, [id, listProduct]);

  return (
    <div>
      {cartIsOpen && <CartModal />}
      <div className={styles.navigationDiv}>
        <Link to={"/"}>
          <h1
            className="navigation-title sm"
            onClick={() => scrollToTLocation(0)}
          >
            {"HOME >"}
          </h1>
        </Link>
        <span className="navigation-title sm">
          {currProduct.name?.toUpperCase()}
        </span>
      </div>
      <section ref={scope} className={styles.productSection}>
        <img src={currProduct.image} alt="Product image" />
        <div className={styles.infosDiv}>
          <h2 className="productCard-title">{currProduct.name}</h2>
          <span className="price">
            {Number(currProduct.price)?.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </span>
          <p className="paragraph">{currProduct.description}</p>
          <div id="cartBtn">
            <button
              className="btn addToCart"
              onClick={() => addItemCart(currProduct)}
            >
              <MdOutlineAddShoppingCart size={20} />
              ADICIONAR AO CARRINHO
            </button>
          </div>
        </div>
      </section>
      <section className={styles.productsSection}>
        <h2 className="title-2">VEJA TAMBÉM</h2>
        <ul>
          {hightLights?.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </ul>
      </section>
    </div>
  );
};
