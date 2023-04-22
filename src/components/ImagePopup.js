import React from "react";

function ImagePopup(props) {
  return(
  <div className={`popup popup_opacity ${props.card.link ? "popup_opened": "" }`} >
    <div className="popup__content popup__content_size">
      <button className="popup__close" id="close-popup-image" onClick={props.onClose}></button>
      <img className="popup__image" src={props.card.link} alt={props.card.name} />
      <p className="popup__text">{props.card.name}</p>
    </div>
  </div>
  )
}

export default ImagePopup;
