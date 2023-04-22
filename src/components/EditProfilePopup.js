import { useContext, useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";
import currentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const userData = useContext(currentUserContext);

  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  function handleChangeName(e) {
    setName(e.target.value)
  }
  function handleChangeAbout(e){
    setAbout(e.target.value)
  }

  useEffect(() => {
    setName(userData.name);
    setAbout(userData.about);
  }, [userData]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about
    });
  }

  return (
    <PopupWithForm
      name="popup-profile"
      title="Редактировать профиль"
      textButton="Сохранить"
      isOpen={props.isOpen}
      onClose={props.isClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__field">
        <input
          type="text"
          className="popup__input"
          defaultValue={name}
          id="popup-name"
          placeholder="Имя"
          minLength="2"
          maxLength="40"
          onChange={handleChangeName}
          required
        />
        <span
          className="popup__span popup-name-error"
          id="popup-name-error-span"
        ></span>
      </div>
      <div className="popup__field">
        <input
          type="text"
          className="popup__input"
          defaultValue={about}
          id="popup-about"
          minLength="2"
          maxLength="200"
          placeholder="О Себе"
          onChange={handleChangeAbout}
          required
        />
        <span
          className="popup__span popup-about-error"
          id="popup-about-error-span"
        ></span>
      </div>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
