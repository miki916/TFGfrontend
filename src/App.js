import PopupWeb from './Component/popupWeb.component';
import React, { useState } from 'react'
import { Routes, Route, useLocation } from "react-router-dom";

import PopupFav from './Component/popupFav.component';
import Login from './Pages/login.page';
import Register from './Pages/register.page';
import Main from './Pages/main.page';
import Recomendados from './Pages/recomendados.page';


// guarda en una session el usuario logueado
function setLogin(login) {

  sessionStorage.setItem('login', JSON.stringify(login))

}

// devuelve si el usuario esta logueado o no
function getLogin() {

  const loginString = sessionStorage.getItem('login')
  const user = JSON.parse(loginString)

  return user?.id;

}

function App() {

  // variables que indican si se tiene que abrir un popup o no
  const [onClickWeb, setOnClickWeb] = useState(false);
  const [onClickFav, setOnClickFav] = useState(false);
  const [onClickGen, setOnClickGen] = useState(true);

  // devuelve si esta logueado o no
  const login = getLogin()
  const location = useLocation();

  // devuelve el popup que debe ser abierto
  const showPopup = () => {

    if (onClickFav && !onClickGen)
      return (<PopupFav setOnClickGen={setOnClickGen} setOnClickWeb={setOnClickFav} />)
    else if (onClickWeb && !onClickGen)
      return (<PopupWeb setOnClickGen={setOnClickGen} setOnClickWeb={setOnClickWeb} />)

  }

  //en caso de que no este logueado solo se podrá entrar en el Login y en el Register
  if (!login && location.pathname !== "/register")
    return <Login setLogin={setLogin} />

  else if (!login && location.pathname === "/register")
    return <Register />


  return (
    <>
      {Nav(setOnClickGen, setOnClickWeb, setOnClickFav)}

      {showPopup()}

      <Routes>

        {onClickGen &&
          <Route path="/" element={<Main />} />}
        {onClickGen &&
          <Route path="/recomendados" element={<Recomendados />} />}

      </Routes>


    </>

  );
}

// Componente navegador
function Nav(setOnClickGen, setOnClickWeb, setOnClickFav) {

  const onClickWeb = () => {
    setOnClickGen(false)
    setOnClickWeb(true)
  }

  const onClickFav = () => {
    setOnClickGen(false)
    setOnClickFav(true)
  }

  const desconected = () => {
    sessionStorage.clear()
  }

  return (
    <nav className="navbar navbar-expand navbar-light border-bottom " >
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">

          <a className="nav-link  text-primary font-weight-bold" href="/">Chyl <span className="sr-only">(current)</span></a>
          <a className="nav-link btn " href='/recomendados'>Recomendados <span className="sr-only">(current)</span></a>

          <a className="nav-link btn " onClick={onClickWeb}>Añadir Web <span className="sr-only">(current)</span></a>
          <a className="nav-link btn " onClick={onClickFav}>Añadir Favoritos <span className="sr-only">(current)</span></a>

        </ul>

        <ul className="navbar-nav my-2 my-lg-0">
          <li className="nav-item">
            <a className="nav-link text-danger" href="/login" onClick={desconected} >Desconectar</a>
          </li>
        </ul>

      </div>
    </nav>
  )

}

export default App;
