import { Route, Routes, useNavigate, Link } from "react-router-dom";

function Header(props) {  
  const navigate = useNavigate();

  function handleButtonExit() {
    navigate("/sign-in", { replace: true });
    localStorage.removeItem("jwt");
    props.userInfo.setProfileUser({});
    props.loggedIn.setLoggedIn(false)
  }
  return (
    <header className="header">
      <div className="header__logo"></div>
      <div className="header__text-container">
        {props.loggedIn.loggedIn && (
          <p className="header__text">{props.userInfo.profileUser.email}</p>
        )}
        {props.loggedIn.loggedIn ? (
          <h2 className="header__text" onClick={handleButtonExit}>Выйти</h2>
        ) : (
          <Routes>
            <Route
              path="/sign-in"
              element={
                <Link to="/sign-up" className="header__text">
                  Регистрация
                </Link>
              }
            />
            <Route
              path="/sign-up"
              element={
                <Link to="/sign-in" className="header__text">
                  Войти
                </Link>
              }
            />
          </Routes>
        )}
      </div>
    </header>
  );
}

export default Header;
