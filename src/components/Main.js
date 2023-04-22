import { useContext } from "react";
import Card from "./Card.js";
import currentUserContext from "../contexts/CurrentUserContext.js"
import arrayCardsContext from "../contexts/ArrayCardsContext.js"

function Main(props) {

  const currentUser = useContext(currentUserContext)
  const getInitialCards = useContext(arrayCardsContext)

  return (
    <main>
      <section className="profile">
        <div className="profile__info">
          <div
            className="profile__avatar-container"
            onClick={props.onEditAvatar}
          >
            <img
              src={currentUser.avatar}
              alt="аватар профиля"
              className="profile__avatar"
            />
          </div>
          <div>
            <div className="profile__text">
              <h1 className="profile__title">{currentUser.name}</h1>
              <button
                className="button button_edit"
                onClick={props.onEditProfile}
              ></button>
            </div>
            <p className="profile__subtitle">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="button button_add"
          type="submit"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="elements">
        <ul className="element">
          {getInitialCards.map((card) => (
            <Card
              dataCard={card}
              key={card._id}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
