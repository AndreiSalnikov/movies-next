import {useState} from 'react';
import style from "./index.module.scss";
import Logo from "../../components/Logo/Logo";
// import {Link, useNavigate} from "react-router-dom";

import {useAuth} from "@/hooks/useAuth";
import {mainApi} from "@/utils/MainApi";
import {useFormValidation} from "@/hooks/useFormValidation";
import Link from "next/link";
import {useRouter} from "next/router";
import {withAuth} from "@/hoc/ProtectedRoute";

function Registration() {
  const {
    register,
    handleSubmit,
    errors,
    isValid,
    validateName,
    validateEmail,
    validatePassword,
  } = useFormValidation();
  const [errorRegistration, setErrorRegistration] = useState("");
   const {user, setUser} = useAuth();
  const [loadButton, setLoadButton] = useState(false);
  const router = useRouter();
  const onSubmit = async (data, e) => {
    e.preventDefault();
    setLoadButton(true);
    setErrorRegistration("");
    try {
      await mainApi.register(data.name, data.email, data.password);
      const {token} = await mainApi.login(data.email, data.password);
      mainApi.setToken(token);
      const userData = await mainApi.tokenCheck(token);
      setUser({name: userData.name, email: userData.email});
      await router.replace('/movies')
    } catch (err) {
      console.error(err);
      setErrorRegistration(err.message);
      setLoadButton(false);
    }
  };

  return (
    <main className={style.registration}>
      <Logo/>
      <h1 className={style.registration__title}>Добро пожаловать!</h1>
      <form className={style.registration__form} onSubmit={handleSubmit(onSubmit)}>
        <p className={style.registration__placeholder}>Имя</p>
        <input
          {...register('name', validateName)}
          className={style.registration__input}/>
        <span
          className={errors.name ? `${style.registration__error} ${style.registration__error_active}` :
            `${style.registration__error}`}>{errors?.name?.message || ""}
        </span>
        <p className={style.registration__placeholder}>E-mail</p>
        <input
          className={style.registration__input}
          {...register('email', validateEmail)}
        />
        <span
          className={errors.email ?
            `${style.registration__error} ${style.registration__error_active}` :
            `${style.registration__error}`}>{errors?.email?.message || ""}
        </span>
        <p className={style.registration__placeholder}>Пароль</p>
        <input
          className={style.registration__input}
          {...register('password', validatePassword)}
          type={"password"}
        />
        <span
          className={errors.password ?
            `${style.registration__error} ${style.registration__error_active}` :
            `${style.registration__error}`}>
          {errors?.password?.message || ""}
        </span>
        <span
          className={!user ?
            `${style.registration__failed_active} ${style.registration__failed}` :
            `${style.registration__failed}`}>{errorRegistration}</span>
        <button
          className={!isValid || loadButton ? `${style.registration__button} ${style.registration__button__type_disabled}` :
            `${style.registration__button}`
          }
          disabled={!isValid || loadButton}>
          {loadButton ? 'Загрузка...' : 'Зарегистрироваться'}
        </button>
        <p className={style.registration__offer}>Уже зарегистрированы?
          <Link className={style.registration__login}
                href='/signin'> Войти</Link>
        </p>
      </form>
    </main>
  );
}

export default withAuth(Registration);
