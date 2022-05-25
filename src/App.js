import NewWebsite from './Component/popupWeb.component';
import React, { useState } from 'react'
import {
  Routes,
  Route,
  useLocation
} from "react-router-dom";

import NewFav from './Component/popupFav.component';

import Login from './Pages/login.page';
import Register from './Pages/register.page';
import Main from './Pages/main.page';
import Recomendados from './Pages/recomendados.page';



function setLogin(login) {

  sessionStorage.setItem('login', JSON.stringify(login))

}

function getLogin() {

  const loginString = sessionStorage.getItem('login')
  const user = JSON.parse(loginString)

  return user?.id;

}

function App() {

  const [onClickWeb, setOnClickWeb] = useState(false);
  const [onClickFav, setOnClickFav] = useState(false);

  const login = getLogin()
  const location = useLocation();

  if (!login && location.pathname !== "/register")
    return <Login setLogin={setLogin} />

  else if (!login && location.pathname === "/register")
    return <Register />



  return (
    <>
      {Nav(setOnClickWeb, setOnClickFav)}
      {onClickWeb &&

        <NewWebsite setOnClickWeb={setOnClickWeb} />
      }

      {onClickFav &&

        <NewFav setOnClickWeb={setOnClickFav} />
      }
      <Routes>

        <Route path="/" element={<Main />} />
        <Route path="/recomendados" element={<Recomendados />} />

      </Routes>


    </>

  );
}


function Nav(setOnClickWeb, setOnClickFav) {

  const onClickWeb = () => {
    setOnClickWeb(true)
  }

  const onClickFav = () => {
    setOnClickFav(true)
  }

  const desconected = () => {
    sessionStorage.clear()
  }

  return (
    <nav className="navbar navbar-expand navbar-light border-bottom" /*style={{ backgroundColor: "#C70B14" }}*/ >
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
