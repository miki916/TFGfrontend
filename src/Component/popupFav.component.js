import React, { useEffect, useState } from 'react'
import axios from "axios";

export default function NewFav({ setOnClickWeb }) {

    const baseURLWeb = "http://localhost:8080/api/website/"
    const baseURLPersonal = "http://localhost:8080/api/personal/"

    const [homePage, setHomePage] = useState("")
    const [web, setWebFav] = useState("")
    const [result, setResult] = useState("")
    const [webs, setWeb] = useState([])

    const getWebsite = async () => {

        const loginString = sessionStorage.getItem('login')
        const user = JSON.parse(loginString)
        var json = { "user": { "id": user.id }, "idtype": 1 }

        await axios.post(baseURLWeb + "get/favorites", json)
            .then(res => {
                setWeb(res.data)
            })

    }

    const submit = async () => {

        const loginString = sessionStorage.getItem('login')
        const user = JSON.parse(loginString)

        var json = { "type": "1", "user": { "id": user.id }, "homePage": homePage, "website": { "id": parseInt(web) } };

        await axios.post(baseURLPersonal + "save", json)
            .then(res => {
                setResult(res.data)
                console.log(res)
            })

    }

    const onClick = () => {

        setOnClickWeb(false)

    }


    useEffect(() => {
        getWebsite();

    }, [])

    return (
        <div className="modal-css">
            <div className="overlay-css"></div>

            <div className="modal-content-css">
                <h3 className='font-weight-bold mt-2'>AÑADIR FAVORITO</h3>

                <div className="form-outline mb-4">
                    <input type="text" id="loginName" className="form-control" onChange={e => setHomePage(e.target.value)} placeholder='Pagina de inicio' />
                </div>

                <select defaultValue={'DEFAULT'} className="form-control" aria-label="Default select example" onChange={e => setWebFav(e.target.value)} >
                    <option >Elige una web</option>
                    {webs.map(res => <option key={res.id} value={res.id}>{res.title}</option>)}
                </select>
                <button type="submit" onClick={submit} className="btn btn-primary btn-block  mt-4">Guardar</button>

                <button className="close-modal-css btn  btn-circle" onClick={onClick}>
                    X
                </button>
            </div>
        </div>
    )
}
