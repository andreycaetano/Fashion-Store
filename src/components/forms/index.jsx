import { StdInput, StdTextArea } from "./inputs/index.jsx";
import { useForm } from "react-hook-form";
import { MdArrowBack, MdOutlineModeEditOutline } from "react-icons/md";
import { LiaPlusCircleSolid } from "react-icons/lia";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginSchema,
  productSchema,
  registerAdminSchema,
} from "./index.schema.js";
import { useContext, useState } from "react";
import { productContext } from "../../providers/productsProvider.jsx";
import { loginContext } from "../../providers/loginProvider.jsx";
import { Link } from "react-router-dom";
import styles from "./style.module.scss";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const LoginForm = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { login } = useContext(loginContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const submit = (payload) => {
    login(payload);
  };

  return (
    <form onSubmit={handleSubmit(submit)} className={styles.form}>
      <h2 className="title-2">ENTRAR</h2>

      <StdInput
        type={"text"}
        placeholder={"Email"}
        {...register("email")}
        error={errors.email}
      />
      <div className={styles.inputDiv}>
        <StdInput
          type={isVisible ? "text" : "password"}
          placeholder={"Senha"}
          {...register("password")}
          error={errors.password}
        />
        {isVisible ? (
          <FaEye
            className={styles.visibleIcon}
            onClick={() => setIsVisible(false)}
          />
        ) : (
          <FaEyeSlash
            className={styles.hiddenIcon}
            onClick={() => setIsVisible(true)}
          />
        )}
      </div>
      <div className={styles.buttonsDiv}>
        <button type="submit" className="btn access">
          ACESSAR
        </button>
        <Link to={"/register"} className="btn register">
          CADASTRE-SE
        </Link>
      </div>
    </form>
  );
};

export const RegisterAdminForm = () => {
  const [isVisiblePass, setIsVisiblePass] = useState(false);
  const [isVisibleConfirmPass, setIsVisibleConfirm] = useState(false);
  const { createUser } = useContext(loginContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerAdminSchema) });

  const submit = (payload) => {
    createUser(payload);
  };

  return (
    <div className={styles.registerForm__container}>
      <Link to={"/login"}>
        <button className={`${styles.backBtn}`}>
          <MdArrowBack size={28} />
          VOLTAR
        </button>
      </Link>
      <h2 className="title-2">CADASTRAR-SE</h2>
      <p className="paragraph">Seja bem vindo, administrador!</p>
      <form onSubmit={handleSubmit(submit)} className={styles.form__inputs}>
        <StdInput
          type={"text"}
          placeholder={"Nome"}
          {...register("name")}
          error={errors.name}
        />
        <StdInput
          type={"email"}
          placeholder={"Email"}
          {...register("email")}
          error={errors.email}
        />
        <div className={styles.passwordDiv}>
          <StdInput
            type={isVisiblePass ? "text" : "password"}
            placeholder={"Senha"}
            {...register("password")}
            error={errors.password}
          />
          {isVisiblePass ? (
            <FaEye
              className={styles.visibleIcon}
              onClick={() => setIsVisiblePass(false)}
            />
          ) : (
            <FaEyeSlash
              className={styles.hiddenIcon}
              onClick={() => setIsVisiblePass(true)}
            />
          )}
        </div>
        <div className={styles.confirmPasswordDiv}>
          <StdInput
            type={isVisibleConfirmPass ? "text" : "password"}
            placeholder={"Confirmar senha"}
            {...register("passValidate")}
            error={errors.passValidate}
          />
          {isVisibleConfirmPass ? (
            <FaEye
              className={styles.visibleIcon}
              onClick={() => setIsVisibleConfirm(false)}
            />
          ) : (
            <FaEyeSlash
              className={styles.hiddenIcon}
              onClick={() => setIsVisibleConfirm(true)}
            />
          )}
        </div>
        <button className="btn registerForm">CADASTRAR-SE</button>
      </form>
    </div>
  );
};

export const RegisterProductForm = () => {
  const { createItem } = useContext(productContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(productSchema) });

  const submit = (payload) => {
    createItem(payload);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submit)}>
        <StdInput
          type={"text"}
          placeholder={"NOME"}
          {...register("name")}
          error={errors.name}
        />
        <StdInput
          type={"number"}
          placeholder={"PREÇO (R$)"}
          {...register("price")}
          error={errors.price}
        />
        <StdInput
          type={"text"}
          placeholder={"IMAGEM (URL)"}
          {...register("image")}
          error={errors.image}
        />
        <StdTextArea
          placeholder={"DESCRIÇÃO RESUMIDA"}
          {...register("description")}
          error={errors.description}
        />
        <button className="btn newProduct">
          <LiaPlusCircleSolid size={30} />
          NOVO PRODUTO
        </button>
      </form>
    </div>
  );
};

export const UpdateProductForm = () => {
  const { updateItem, editingProduct } = useContext(productContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(productSchema),
    values: {
      name: editingProduct.name,
      price: editingProduct.price,
      description: editingProduct.description,
      image: editingProduct.image,
    },
  });

  const submit = (payload) => {
    updateItem(payload);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submit)}>
        <StdInput
          type={"text"}
          placeholder={"Nome"}
          {...register("name")}
          error={errors.name}
        />
        <StdInput
          type={"number"}
          placeholder={"Preço R$"}
          {...register("price")}
          error={errors.price}
        />
        <StdInput
          type={"text"}
          placeholder={"Imagem (url)"}
          {...register("image")}
          error={errors.image}
        />
        <StdTextArea
          placeholder={"Descriçao resumida"}
          {...register("description")}
          error={errors.description}
        />
        <button className="btn editProduct">
          <MdOutlineModeEditOutline size={30} />
          EDITAR PRODUTO
        </button>
      </form>
    </div>
  );
};
