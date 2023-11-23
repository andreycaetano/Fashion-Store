import { useContext, useEffect } from "react";
import { RegisterProductForm, UpdateProductForm } from "../forms";
import { ProductCardModal } from "../productList/productCard";
import { MdClose } from "react-icons/md";
import { productContext } from "../../providers/productsProvider";
import styles from "./index.module.scss";
import { motion, AnimatePresence } from "framer-motion";

export const CartModal = () => {
  const { setCartIsOpen, listCart, cartTotalValue, cartIsOpen } =
    useContext(productContext);

  const handleClickOutsideModal = (event) => {
    if (cartIsOpen && event.target.id === "modalOverlay-1") {
      setCartIsOpen(null);
    }
  };

  const handleKeyPress = (event) => {
    if (cartIsOpen && event.keyCode === 27) {
      setCartIsOpen(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideModal);
    document.addEventListener("keydown", handleKeyPress);
  }, [cartIsOpen]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideModal);
    document.addEventListener("keydown", handleKeyPress);
  }, []);

  const variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
        type: "spring",
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: -100,
    },
  };

  return (
    <div className={styles.modal__overlay} id="modalOverlay-1">
      <AnimatePresence>
        <motion.div
          key={"cartModal"}
          initial="hidden"
          animate={cartIsOpen ? "visible" : "hidden"}
          exit="hidden"
          variants={variants}
          className={styles.cartModal__container}
          role="dialog"
        >
          <MdClose
            className={styles.cartModal__closeBtn}
            onClick={() => setCartIsOpen(false)}
            size={32}
          />
          <h2>CARRINHO</h2>
          <ul>
            {listCart?.map((listItem) => (
              <ProductCardModal product={listItem} key={listItem.id} />
            ))}
          </ul>
          <p
            className={styles.totalValue__display}
          >{`Total: ${cartTotalValue.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}`}</p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export const RegisterProductModal = () => {
  const { createProduct, setCreateProduct } = useContext(productContext);

  const handleClickOutsideModal = (event) => {
    if (createProduct && event.target.id === "modalOverlay-2") {
      setCreateProduct(null);
    }
  };

  const handleKeyPress = (event) => {
    if (createProduct && event.keyCode === 27) {
      setCreateProduct(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideModal);
    document.addEventListener("keydown", handleKeyPress);
  }, [createProduct]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideModal);
    document.addEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <div
      className={`${styles.modal__overlay} ${styles.productModal}`}
      id="modalOverlay-2"
    >
      <div className={styles.productModal__container} role="dialog">
        <MdClose
          onClick={() => setCreateProduct(null)}
          size={32}
          className={styles.productModal__closeBtn}
        />
        <h2 className="modal-title">NOVO PRODUTO</h2>
        <RegisterProductForm />
      </div>
    </div>
  );
};

export const UpdateProductModal = () => {
  const { editingProduct, setEditingProduct } = useContext(productContext);

  const handleClickOutsideModal = (event) => {
    if (editingProduct && event.target.id === "modalOverlay-3") {
      setEditingProduct(null);
    }
  };

  const handleKeyPress = (event) => {
    if (editingProduct && event.keyCode === 27) {
      setEditingProduct(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideModal);
    document.addEventListener("keydown", handleKeyPress);
  }, [editingProduct]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideModal);
    document.addEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <div
      className={`${styles.modal__overlay} ${styles.productModal}`}
      id="modalOverlay-3"
    >
      <div className={styles.productModal__container} role="dialog">
        <MdClose
          onClick={() => setEditingProduct(null)}
          size={32}
          className={styles.productModal__closeBtn}
        />
        <h2 className="modal-title">EDITAR PRODUTO</h2>
        <UpdateProductForm />
      </div>
    </div>
  );
};

export const ConfirmDeleteModal = () => {
  const { deleteItem, deleteItemModal, setDeleteItemModal } =
    useContext(productContext);

  const handleClickOutsideModal = (event) => {
    if (deleteItemModal && event.target.id === "modalOverlay-4") {
      setDeleteItemModal(null);
    }
  };

  const handleKeyPress = (event) => {
    if (deleteItemModal && event.keyCode === 27) {
      setDeleteItemModal(null);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideModal);
    document.addEventListener("keydown", handleKeyPress);
  }, [deleteItemModal]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutsideModal);
    document.addEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <div
      className={`${styles.modal__overlay} ${styles.productModal}`}
      id="modalOverlay-4"
    >
      <div className={styles.deleteModal__container} role="dialog">
        <div>
          <h2 className="title-2">Confirmar exclusão</h2>
        </div>
        <h2 className="modal-">Tem certeza que deseja fazer isso?</h2>
        <p className="paragraph">Esse processo não pode ser desfeito</p>
        <div className={styles.deleteBtn__container}>
          <button
            className="btn btn-cancel"
            onClick={() => setDeleteItemModal(null)}
          >
            Cancelar
          </button>
          <button
            className="btn btn-confirm"
            onClick={() => deleteItem(deleteItemModal.id)}
          >
            Confirmar exclusão
          </button>
        </div>
      </div>
    </div>
  );
};
