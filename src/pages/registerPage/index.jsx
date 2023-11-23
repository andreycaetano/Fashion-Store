import registerBanner from "../../assets/registerBanner.png";
import { RegisterAdminForm } from "../../components";
import styles from "./index.module.scss";

export const RegisterPage = () => {
  return (
    <section className={styles.content__container}>
      <img src={registerBanner} alt="register banner" />
      <RegisterAdminForm />
    </section>
  );
};
