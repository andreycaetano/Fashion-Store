import { useContext } from "react";
import { BannerSection, ProductsList, CartModal } from "../../components";
import { productContext } from "../../providers/productsProvider";

export const HomePage = () => {
  const { cartIsOpen } = useContext(productContext);

  return (
    <div className="container homePage">
      {cartIsOpen && <CartModal />}
      <BannerSection />
      <ProductsList />
    </div>
  );
};
