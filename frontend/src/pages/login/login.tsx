import {Link} from 'react-router-dom';
import {useAppDispatch} from '../../hooks';
import {FormEvent, useRef} from 'react';
import {UserLoginData} from '../../types/user.types';
import {loginAction} from '../../store/api-actions';
import {Paths} from '../../const';

export function Login() {

  const emailRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const dispatch = useAppDispatch();

  const onSubmit = (authData: UserLoginData) => {
    dispatch(loginAction(authData));
  };


  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    if (emailRef.current !== null && passwordRef.current !== null) {
      onSubmit({
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

  return (
        <div className="container">
          <section className="login">
            <h1 className="login__title">Войти</h1>
            <p className="login__text">Hовый пользователь?
              <Link className="login__link" to={Paths.Register}>Зарегистрируйтесь</Link>
              прямо сейчас</p>
            <form method="post" action="" onSubmit={handleSubmit}>
              <div className="input-login">
                <label htmlFor="email">Введите e-mail</label>
                <input type="email" id="email" name="email" autoComplete="off" ref={emailRef} required/>
                <p className="input-login__error">Заполните поле</p>
              </div>
              <div className="input-login">
                <label htmlFor="passwordLogin">Введите пароль</label><span>
                  <input type="password" placeholder="• • • • • • • • • • • •" id="passwordLogin" name="password"
                         autoComplete="off" ref={passwordRef} required/>
                  <button className="input-login__button-eye" type="button">
                    <svg width="14" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-eye"></use>
                    </svg>
                  </button></span>
                <p className="input-login__error">Заполните поле</p>
              </div>
              <button className="button login__button button--medium" type="submit">Войти</button>
            </form>
          </section>
        </div>
  );
}
