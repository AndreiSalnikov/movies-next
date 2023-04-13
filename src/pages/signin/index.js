import { withAuth } from "@/hoc/ProtectedRoute";
import React, {useState} from 'react';
import style from './index.module.scss'
import Logo from "../../components/Logo/Logo";
import {useAuth} from "@/hooks/useAuth";
import {mainApi} from "@/utils/MainApi";
import {useFormValidation} from "@/hooks/useFormValidation";
import Link from "next/link";
// import {useNavigate} from "next/navigation"
import {useRouter} from "next/router";

const Login = () => {
  const {
    register,
    handleSubmit,
    errors,
    isValid,
    validateEmail,
  } = useFormValidation();
  const [error, setError] = useState("");
  const {user, setUser} = useAuth();
  const router = useRouter();
  const [loadButton, setLoadButton] = useState(false);

  const onSubmit = async ({email, password}, e) => {
    e.preventDefault();
    setLoadButton(true);
    setError("");
    try {
      const {token} = await mainApi.login(email, password);
      mainApi.setToken(token);
      const userData = await mainApi.tokenCheck(token);
      setUser({name: userData.name, email: userData.email});
      await router.replace('/movies')
    } catch (err) {
      console.error(err.message);
      setError(err.message);

      setLoadButton(false);
    }
  };

  return (
    <main className={style.login}>
      <Logo/>
      <h1 className={style.login__title}>Рады видеть!</h1>
      <form className={style.login__form} onSubmit={handleSubmit(onSubmit)}>
        <p className={style.login__placeholder}>E-mail</p>
        <input
          {...register('email', validateEmail)}
          className={style.login__input}
        />
        <span
          className={errors.email ?
            `${style.login__error} ${style.login__error_active}` :
            `${style.login__error}`}>{errors?.email?.message || ""}
        </span>
        <p className={style.login__placeholder}>Пароль</p>
        <input className={style.login__input}
               {...register('password', {
                 required: 'Обязательное поле',
               })}
               type={"password"}/>
        <span
          className={errors.password ?
            `${style.login__error} ${style.login__error_active}` :
            `${style.login__error}`}>
          {errors?.password?.message || ""}
        </span>
        <span
          className={!user ?
            `${style.login__failed_active} ${style.login__failed}` :
            `${style.login__failed}`}>{error}</span>
        <button
          className={
            !isValid || loadButton ? `${style.login__button} ${style.login__button__type_disabled}` :
              `${style.login__button}`
          }
          disabled={!isValid || loadButton}>
          {loadButton ? 'Загрузка...' : 'Войти'}
        </button>
        <p className={style.login__offer}>Ещё не зарегистрированы?
          <Link className={style.login__registration} href='/signup'> Регистрация</Link>
        </p>
      </form>
    </main>
  );
};

export default withAuth(Login);
