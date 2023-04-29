import { useState } from "react";
import { Link } from "react-router-dom";
import {register} from "../utils/Auth";

export function Register(props) {
  const [formValue, setFormValue] = useState({
    email: "",
    userPassword: "",
  });

  function handleChangeForm(e) {
    const { name, value } = e.target;

    setFormValue({
      ...formValue,
      [name]: value,
    });
  }

  function handleSubmitForm(e) {
    e.preventDefault();
    const { userPassword, email } = formValue;
    register(userPassword, email)
      .then((res) => {
        if (res.ok) {
          setFormValue({ userPassword: "", email: "" });
          props.onInfoTooltip({ isOpened: true, res: true });
        } else {
          props.onInfoTooltip({ isOpened: true, res: false });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="sign">
      <h2 className="sign__text">Регистрация</h2>
      <form onSubmit={handleSubmitForm} className="sign__form">
        <input
          className="sign__input"
          type="email"
          name="email"
          value={formValue.email}
          onChange={handleChangeForm}
          placeholder="Email"
          maxLength='35'
          required
        />
        <input
          className="sign__input"
          type="password"
          name="userPassword"
          value={formValue.userPassword}
          onChange={handleChangeForm}
          placeholder="Пароль"
          maxLength='15'
          minLength='3'
          required
        />
        <button className="sign__button" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <h3 className="sing__subtitle">
        Уже зарегистрированы?{" "}
        <Link className="link" to="/sing-in">
          Войти
        </Link>
      </h3>
    </div>
  );
}

export default Register;
