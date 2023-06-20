import {FormEvent, useRef} from 'react';
import {useAppDispatch} from '../../hooks';
import {UserRegisterData} from '../../types/user.types';
import {registerAction} from '../../store/api-actions';

export function Register(): JSX.Element {

  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const onSubmit = (registerData: UserRegisterData) => {
    dispatch(registerAction(registerData));
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (nameRef.current !== null && emailRef.current !== null && passwordRef.current !== null) {
      onSubmit({
        name: nameRef.current.value,
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });
    }
  };

  return (
    <div className="container">
      <section className="login">
        <h1 className="login__title">Регистрация</h1>
        <form method="post" action="" onSubmit={handleSubmit}>
          <div className="input-login">
            <label htmlFor="name">Введите имя</label>
            <input type="text" id="name" name="name" autoComplete="off" ref={nameRef} required />
            <p className="input-login__error">Заполните поле</p>
          </div>
          <div className="input-login">
            <label htmlFor="email">Введите e-mail</label>
            <input type="email" id="email" name="email" autoComplete="off" ref={emailRef} required />
            <p className="input-login__error">Заполните поле</p>
          </div>
          <div className="input-login">
            <label htmlFor="password">Придумайте пароль</label>
            <span>
              <input
                type="password"
                placeholder="• • • • • • • • • • • •"
                id="password"
                name="password"
                autoComplete="off"
                ref={passwordRef}
                required
              />
              <button className="input-login__button-eye" type="button">
                <svg width="14" height="8" aria-hidden="true">
                  <use xlinkHref="#icon-eye"></use>
                </svg>
              </button>
            </span>
            <p className="input-login__error">Заполните поле</p>
          </div>
          <button className="button login__button button--medium" type="submit">
            Зарегистрироваться
          </button>
        </form>
      </section>
    </div>
  );
}
