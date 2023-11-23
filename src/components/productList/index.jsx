import { useContext, useEffect } from "react";
import { ProductCard } from "./productCard/index.jsx";
import { productContext } from "../../providers/productsProvider.jsx";
import styles from "./style.module.scss";
import { motion, stagger, useAnimate, useInView } from "framer-motion";

export const ProductsList = () => {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);

  useEffect(() => {
    const animateList = async () => {
      const animateElement = await document.querySelectorAll(".animateElement");
      if (isInView) {
        animate(
          animateElement,
          { opacity: [0, 1], x: [150, 0] },
          { duration: 1, delay: stagger(0.2) },
        );
      }
    };
    animateList();
  }, [isInView]);

  const { listProduct } = useContext(productContext);
  return (
    <section className={styles.section}>
      <h2 className="title-2">PRODUTOS EM DESTAQUE</h2>
      <ul ref={scope} className={styles.ul}>
        {listProduct?.map((product) => {
          return (
            <motion.div className="animateElement" key={product.id}>
              <ProductCard product={product} />
            </motion.div>
          );
        })}
      </ul>
    </section>
  );
};
