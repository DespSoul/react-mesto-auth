import { useState } from "react";
import { authorize } from "../utils/Auth";
import { useNavigate } from "react-router-dom";

export function Login(props) {
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
    authorize(userPassword, email)
      .then((data) => {
        if (data) {
          props.loggedIn();
          localStorage.setItem("jwt", data.token);
        }
        setFormValue({ userPassword: "", email: "" });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="sign">
      <h2 className="sign__text">Вход</h2>
      <form onSubmit={handleSubmitForm} className="sign__form">
        <input
          className="sign__input"
          type="email"
          placeholder="Email"
          name="email"
          value={formValue.email}
          onChange={handleChangeForm}
          maxLength="35"
          required
        />
        <input
          className="sign__input"
          type="password"
          name="userPassword"
          placeholder="Пароль"
          value={formValue.userPassword}
          onChange={handleChangeForm}
          minLength="3"
          maxLength="15"
          required
        />
        <button className="sign__button" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
