import { Route, Routes, Link } from "react-router-dom";

function Header(props) {
  console.log(props)
  return (
    <header className="header">
      <div className="header__logo"></div>
      <div className="header__text-container">
        {props.loggedIn && (
          <p className="header__text">{props.userInfo.profileUser.email}</p>
        )}
        {props.loggedIn ? (
          <h2 className="header__text" onClick={props.onSignOut}>
            Выйти
          </h2>
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
