import {useEffect} from "react";
import unionOne from "../images/UnionOne.png";
import unionTwo from "../images/UnionTwo.png"

export function InfoTooltip(props) {
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
      <div className={`popup ${ props.isOpen.isOpened? 'popup_opened' : '' }`}>
        <div className="popup__content">
          <button className="popup__close" onClick={props.isClose}></button>
          <img src={props.isOpen.res? unionOne : unionTwo} className="popup__icon" />
          <h2 className="popup__title">{props.isOpen.res? 'Вы успешно зарегистрировались!': `Что-то пошло не так!
Попробуйте ещё раз.`}</h2>
        </div>
      </div>
    </>
  );
}

export default InfoTooltip;
