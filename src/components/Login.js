import React from "react";

export function Login() {
  return (
    <div className="sign">
      <h2 className="sign__text">Вход</h2>
      <form className="sign__form">
        <input className="sign__input" placeholder="Email"/>
        <input className="sign__input" placeholder="Пароль" />
        <button className="sign__button" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
