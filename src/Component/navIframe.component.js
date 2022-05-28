import React, { useEffect, useState } from 'react'
import axios from "axios";

export default function NavIframe({ setIFrame }) {

    const baseURLWeb = "http://localhost:8080/api/website/"
    const baseURLPersonal = "http://localhost:8080/api/personal/"

    const [favorites, setFavorites] = useState([])
    const [webs, setWeb] = useState([])


    const getWebsite = async () => {

        await axios.get(baseURLWeb + "get/all")
            .then(res => { setWeb(res.data) })

    }

    const getFavorites = async () => {

        const loginString = sessionStorage.getItem('login')
        const user = JSON.parse(loginString)

        var json = { user: { "id": user.id }, idtype: 1 }

        await axios.post(baseURLPersonal + "get", json)
            .then(res => { setFavorites(res.data) })

    }

    useEffect(() => {

        getWebsite();
        getFavorites()

    }, [])

    const onChange = (e) => {

        if (e !== "default")
            setIFrame(e)

    }

    const favDisplay = () => {

        if (favorites.length > 0)
            return (<li className="nav-item dropdown">

                <select className="form-control" aria-label="Default select example" onChange={e => onChange(e.target.value)} >
                    <option defaultValue={'DEFAULT'} value="default">Favoritos</option>
                    {favorites.map(element => <option key={element.id} value={element.homePage} className="dropdown-item">{element.website.title}</option>)}
                </select>
            </li>)

    }

    return (
        <nav className="navbar navbar-expand navbar-dark bg-white" >
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">

                    {favDisplay()}

                </ul>

                <ul className="navbar-nav my-2 my-lg-0">

                    <li className="nav-item dropdown">
                        <select className="form-control" aria-label="Default select example" onChange={e => onChange(e.target.value)} >
                            <option defaultValue={'DEFAULT'} value="default">Páginas webs</option>
                            {webs.map(element => <option key={element.id} value={element.domain} className="dropdown-item">{element.title}</option>)}
                        </select>
                    </li>

                </ul>
            </div>
        </nav>
    )
}
