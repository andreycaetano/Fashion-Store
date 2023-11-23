import { createContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const productContext = createContext({});

export const ProductProvider = ({ children }) => {
  const [listProduct, setListProduct] = useState([]);
  const [currentItem, setCurrentItem] = useState({});
  const [editingProduct, setEditingProduct] = useState(null);
  const [createProduct, setCreateProduct] = useState(null);
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [deleteItemModal, setDeleteItemModal] = useState(null);
  const [cartTotalValue, setCartTotalValue] = useState(null);

  const [listCart, setListCart] = useState(
    localStorage.getItem("@FSCart")
      ? JSON.parse(localStorage.getItem("@FSCart"))
      : [],
  );

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

  useEffect(() => {
    localStorage.setItem("@FSCart", JSON.stringify(listCart));
  }, [listCart]);

  useEffect(() => {
    const totalCartValue = listCart?.reduce(
      (acc, cur) => acc + cur.price * cur.count,
      0,
    );
    setCartTotalValue(totalCartValue);
  }, [listCart]);

  const [cartCounter, setCartCounter] = useState(0);

  useEffect(() => {
    const cartItensCount = listCart?.reduce((acc, cur) => acc + cur.count, 0);
    setCartCounter(cartItensCount);
  }, [listCart]);

  const getCurrentItem = async (id) => {
    try {
      const { data } = await api.get(`/products/${id}`);
      setCurrentItem(data);
    } catch (error) {
      console.log(error);
    }
  };

  const scrollToTLocation = (location) => {
    window.scrollTo({
      top: location,
      behavior: "smooth",
    });
  };

  const createItem = async (formData) => {
    try {
      const token = JSON.parse(localStorage.getItem("@FSToken"));
      const { data } = await api.post("/products", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Produto adicionado com sucesso!");
      setListProduct([...listProduct, data]);
      setCreateProduct(null);
    } catch (error) {
      console.log(error);
    }
  };

  const updateItem = async (formData) => {
    try {
      const token = JSON.parse(localStorage.getItem("@FSToken"));
      const { data } = await api.put(
        `/products/${editingProduct.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const newListProduct = listProduct.map((product) => {
        if (product.id === editingProduct.id) {
          return data;
        } else {
          return product;
        }
      });
      toast.success("Produto editado com sucesso!");
      setEditingProduct(null);
      setListProduct(newListProduct);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteItem = async (id) => {
    try {
      const token = JSON.parse(localStorage.getItem("@FSToken"));
      api.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const newListItem = listProduct.filter((product) => {
        if (product.id != id) {
          return product;
        }
      });
      toast.success("Produto removido com sucesso!");
      setDeleteItemModal(null);
      setListProduct(newListItem);
    } catch (error) {
      console.log(error);
    }
  };

  const addItemCart = (product) => {
    const verifyItem = listCart.find((cartItem) => cartItem.id === product.id);
    const list = [...listCart];
    if (verifyItem) {
      verifyItem.count += 1;
    } else {
      list.push({ ...product, count: 1 });
    }
    setListCart(list);
    toast.success("Produto adicionado ao carrinho!");
    localStorage.setItem("@FSCart", JSON.stringify(listCart));
  };

  const removeItemCart = (product) => {
    const newList = listCart.filter((item) => {
      if (item.id !== product.id) {
        return item;
      } else if (item.id === product.id && item.count > 1) {
        item.count -= 1;
        return item;
      }
    });
    toast.success("Produto removido do carrinho!");
    setListCart(newList);
  };

  return (
    <productContext.Provider
      value={{
        listCart,
        listProduct,
        currentItem,
        setCurrentItem,
        editingProduct,
        setEditingProduct,
        getCurrentItem,
        createItem,
        updateItem,
        deleteItem,
        setCartIsOpen,
        setCreateProduct,
        createProduct,
        cartIsOpen,
        addItemCart,
        removeItemCart,
        deleteItemModal,
        setDeleteItemModal,
        cartTotalValue,
        cartCounter,
        setListProduct,
        scrollToTLocation,
      }}
    >
      {children}
    </productContext.Provider>
  );
};
