import { forwardRef } from "react";
import styles from "./index.module.scss";

export const StdInput = forwardRef(({ error, ...rest }, ref) => {
  return (
    <>
      <input {...rest} ref={ref} />
      {error && <small className={styles.error_message}>{error.message}</small>}
    </>
  );
});

export const StdTextArea = forwardRef(({ error, ...rest }, ref) => {
  return (
    <>
      <textarea {...rest} ref={ref}></textarea>
      {error && <small>{error.message}</small>}
    </>
  );
});
