import bannerImg from "../../assets/banner.png";
import { LoginForm } from "../../components";
import styles from "./style.module.scss";

export const LoginPage = () => {
  return (
    <div className="container">
      <section className={styles.section}>
        <img src={bannerImg} alt="banner image" />
        <LoginForm />
      </section>
    </div>
  );
};
