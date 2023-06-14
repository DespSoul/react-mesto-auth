import { useState, useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
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
import Login from "./Login";
import Register from "./Register";
import ProtectedRouteElement from "./ProtectedRouteElement";
import InfoTooltip from "./InfoTooltip";
import { getConfirmationValidation } from "../utils/Auth";
import { authorize, register } from "../utils/Auth";

function App() {
  const navigate = useNavigate();
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isInfoTooltip, setInfoTooltip] = useState({
    isOpened: false,
    res: false,
  });
  const [selectedCard, setSelectedCard] = useState({
    name: "",
    link: "",
  });
  const [loggedIn, setLoggedIn] = useState(false);

  const [currentUser, setCurrentUser] = useState({});
  const [arrayCards, setArrayCards] = useState([]);
  const [profileUser, setProfileUser] = useState({});

  function handleLoggedIn() {
    setLoggedIn(true);
  }

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
    setInfoTooltip(false);
    setSelectedCard({ name: "", link: "" });
  }

  function checkToken() {
    const token = localStorage.getItem("jwt");
    if (token) {
      getConfirmationValidation(token)
        .then((res) => {
          setProfileUser({ ...res.data });
        })
        .catch((err) => {
          console.log(err);
        });
      handleLoggedIn();
      navigate("/", { replace: true });
    }
  }

  useEffect(() => {
    checkToken();
    
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getInitialCards(), api.getUsers()]).then(
        ([cards, user]) => {
          setArrayCards(cards);
          setCurrentUser(user);
        }
      );
    }
  }, [loggedIn]);

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

  function handleButtonExit() {
    navigate("/sign-in", { replace: true });
    localStorage.removeItem("jwt");
    setProfileUser({});
    setLoggedIn(false);
  }

  function handleLogin(userPassword, email) {
    authorize(userPassword, email)
      .then((data) => {
        if (data) {
          setLoggedIn(true);
          navigate("/", { replace: true });
          localStorage.setItem("jwt", data.token);
        }
      })
      .catch((err) => {
        setInfoTooltip({
          isOpened: true,
          res: false,
        });
      });
  }

  function handleRegister(userPassword, email) {
    register(userPassword, email)
      .then((res) => {
        setInfoTooltip({ isOpened: true, res: true });
      })
      .catch((err) => {
        setInfoTooltip({ isOpened: true, res: false });
      });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <ArrayCardsContext.Provider value={arrayCards}>
        <Header
          loggedIn={loggedIn}
          userInfo={{ profileUser, setProfileUser }}
          onSignOut={handleButtonExit}
        />

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRouteElement
                loggedIn={loggedIn}
                element={Main}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
            }
          />

          <Route
            path="/sign-in"
            element={<Login loggedIn={checkToken} onLogin={handleLogin} />}
          />

          <Route
            path="/sign-up"
            element={
              <Register
                onInfoTooltip={setInfoTooltip}
                onRegister={handleRegister}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        <Footer />

        <ImagePopup card={selectedCard} onClose={closePopup} />

        <InfoTooltip
          isOpen={isInfoTooltip}
          isClose={closePopup}
          title={"Вы успешно зарегистрировались!"}
        />

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
