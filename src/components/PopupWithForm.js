import {useEffect} from "react";

function PopupWithForm(props) {
  function handleEscClose(e) {
    if (e.key === "Escape") {
      props.onClose()
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleEscClose);
    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  });

  return (
    <>
      <div
        className={`popup popup_type_${props.name} ${
          props.isOpen ? "popup_opened" : ""
        }`}
      >
        <div className="popup__content">
          <button className="popup__close" onClick={props.onClose}></button> 
          <h2 className="popup__title">{props.title}</h2>
          <form
            className={`popup__form popup_form_type_${props.name}`}
            name={props.name}
            onSubmit={props.onSubmit}
            noValidate
          >
            {props.children ? props.children : ""}
            <button className="popup__button" type="submit">
              {props.textButton}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default PopupWithForm;
