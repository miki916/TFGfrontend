import React, { useEffect, useState } from 'react'


export default function Nav() {


  const desconected = () => {

    sessionStorage.clear()
  }

  useEffect(() => {


  }, [])

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark" style={{ backgroundColor: "#4432B2" }} >
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">

          <li className="nav-item active">
            <a className="nav-link " href="/">Home <span className="sr-only">(current)</span></a>
          </li>

          <a className="nav-link " href="/nuevaweb">Añadir Web <span className="sr-only">(current)</span></a>
          <a className="nav-link " href="/nuevofav">Añadir Favoritos <span className="sr-only">(current)</span></a>

        </ul>

        <ul className="navbar-nav my-2 my-lg-0">
          <li className="nav-item ">
            <a className="nav-link " href="/login" onClick={desconected} >Desconectar</a>
          </li>
        </ul>

      </div>
    </nav>
  )
}
