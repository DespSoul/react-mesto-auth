import { useRef, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const inputRef = useRef();
  useEffect(() => {
    inputRef.current.value = "";
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({ avatar: inputRef.current.value });
  }

  return (
    <PopupWithForm
      name="save-avatar"
      title="Обновить аватар"
      textButton="Сохранить"
      isOpen={props.isOpen}
      onClose={props.isClose}
      onSubmit={handleSubmit}
    >
      <div className="popup__field">
        <input
          type="url"
          className="popup__input"
          placeholder="Ссылка на картинку"
          ref={inputRef}
          required
        />
        <span className="popup__span link-avatar-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
