import { useContext } from "react";
import currentUserContext from "../contexts/CurrentUserContext";

function Card(props) {
  function handleClick() {
    props.onCardClick(props.dataCard);
  }
  const userData = useContext(currentUserContext)

  const isOwn = props.dataCard.owner._id === userData._id;

  const isLiked = props.dataCard.likes.some(i => i._id === userData._id);
  
  const cardLikeButtonClassName = (
    `element__like ${isLiked  && "element__like_active"}`
  )
  
  function handleLikeClick () {
    props.onCardLike(props.dataCard)
  }
  function handleCardDelete (){
    props.onCardDelete(props.dataCard)
  }

  return (
    <li className="element__content">
      {isOwn && <button className="element__delete" onClick={handleCardDelete} />}
      <img
        className="element__image"
        src={props.dataCard.link}
        alt={props.dataCard.name}
        onClick={handleClick}
      />
      <div className="element__text">
        <h2 className="element__title">{props.dataCard.name}</h2>
        <div className="element__like-container">
          <button className={cardLikeButtonClassName} onClick={handleLikeClick} />
          <p className="element__like-quantity">{props.dataCard.likes.length}</p>
          <p></p>
        </div>
      </div>
    </li>
  );
}

export default Card;
