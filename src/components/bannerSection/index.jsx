import { useContext } from "react";
import bannerImg from "../../assets/banner.png";
import styles from "./style.module.scss";
import { motion } from "framer-motion";
import { productContext } from "../../providers/productsProvider";

const BannerSection = () => {
  const { scrollToTLocation } = useContext(productContext);

  return (
    <section className={styles.section}>
      <motion.img
        src={bannerImg}
        alt="banner image"
        initial={{ x: -1000, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{
          type: "spring",
          duration: 3,
          stiffness: 40,
          delay: 0.2,
        }}
      />
      <div className={styles.banner__buttonContainer}>
        <motion.h1
          transition={{
            type: "spring",
            delay: 0.2,
            duration: 1.5,
            stiffness: 40,
          }}
          initial={{ x: 1300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="title-1"
        >
          KENZIE FASHION STORE
        </motion.h1>

        <motion.div
          initial={{ x: 1300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{
            type: "spring",
            delay: 0.3,
            duration: 1.5,
            stiffness: 40,
          }}
          className={styles.btn__container}
        >
          <button
            className="btn checkOut"
            onClick={() => scrollToTLocation(700)}
          >
            CONFIRA AS OFERTAS
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export { BannerSection };
