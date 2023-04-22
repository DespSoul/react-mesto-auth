import { useState, useEffect } from "react";
import "../pages/index.css";
import api from "../utils/Api";
import Footer from "./Footer.js";
import Header from "./Header.js";
import ImagePopup from "./ImagePopup.js";
import Main from "./Main.js";
import PopupWithForm from "./PopupWithForm.js";
import CurrentUserContext from "../contexts/CurrentUserContext";
import ArrayCardsContext from "../contexts/ArrayCardsContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({
    name: "",
    link: "",
  });

  const [currentUser, setCurrentUser] = useState([]);
  const [arrayCards, setArrayCards] = useState([]);

  useEffect(() => {
    Promise.all([api.getInitialCards(), api.getUsers()]).then(
      ([cards, user]) => {
        setArrayCards(cards);
        setCurrentUser(user);
      }
    );
  }, []);

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closePopup() {
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard({ name: "", link: "" });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    (isLiked ? api.deleteLike(card._id) : api.addLike(card._id))
      .then((newCard) => {
        setArrayCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then((res) => {
        setArrayCards(arrayCards.filter((e) => !(e._id === card._id)));
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateUser({ name, about }) {
    api
      .editProfile({ name, about })
      .then((data) => {
        setCurrentUser(data);
        closePopup();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .editAvatar({ avatar })
      .then((data) => {
        setCurrentUser(data);
        closePopup();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlace({ name, link }) {
    api
      .addNewCard({ name, link })
      .then((newCard) => {
        setArrayCards([newCard, ...arrayCards]);
        closePopup();
      })
      .catch((err) => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <ArrayCardsContext.Provider value={arrayCards}>
        <Header />

        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />

        <Footer />

        <ImagePopup card={selectedCard} onClose={closePopup} />

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          isClose={closePopup}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          isClose={closePopup}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          isClose={closePopup}
          onAddPlace={handleAddPlace}
        />

        <PopupWithForm name="delete-card" title="Вы уверены?" textButton="Да" />
      </ArrayCardsContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
