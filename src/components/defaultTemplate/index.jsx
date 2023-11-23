import { AppHeader } from "../header/index.jsx";
import { AppFooter } from "../footer/index.jsx";
import styles from "./index.module.scss";

export const DefaultTemplate = ({ children }) => {
  return (
    <div className={styles.content__container}>
      <AppHeader />
      {children}
      <AppFooter />
    </div>
  );
};
