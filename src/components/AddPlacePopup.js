import PopupWithForm from "./PopupWithForm";
import { useRef, useEffect } from "react";

function AddPlacePopup(props) {
  const inputRefName = useRef();
  const inputRefLink = useRef();
  
  useEffect(() => {
    inputRefName.current.value = "";
    inputRefLink.current.value = "";
  }, [props.isOpen]);

  function handleAddPlaceSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: inputRefName.current.value,
      link: inputRefLink.current.value,
    });
  }

  return (
    <PopupWithForm
      name="popup_place"
      title="Новое место"
      textButton="Создать"
      isOpen={props.isOpen}
      onClose={props.isClose}
      onSubmit={handleAddPlaceSubmit}
    >
      <div className="popup__field">
        <input
          type="text"
          className="popup__input"
          placeholder="Название"
          ref={inputRefName}
          minLength="2"
          maxLength="30"
          required
        />
        <span className="popup__span name-error" id="popup-name-error"></span>
      </div>
      <div className="popup__field">
        <input
          type="url"
          className="popup__input"
          placeholder="Ссылка на картинку"
          ref={inputRefLink}
          required
        />
        <span className="popup__span link-error"></span>
      </div>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
