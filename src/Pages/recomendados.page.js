import React, { useState, useEffect } from 'react'
import axios from "axios";
import Recomendation from '../Component/recomendation.component';
import PopupPage from '../Component/popupPage.component';

export default function Recomendados() {

    const baseURLWeb = "http://localhost:8080/api/website/"

    const [recomendaciones, setRecomendaciones] = useState([])
    const [onClickPage, setOnClickPage] = useState(false)
    const [url, setURL] = useState("")

    const getRecomendados = async () => {

        const loginString = sessionStorage.getItem('login')
        const user = JSON.parse(loginString)
        var json = { "id": user.id }

        await axios.post(baseURLWeb + "get/recomendations", json)
            .then(res => {
                console.log(res.data);
                setRecomendaciones(res.data)
            })

    }


    useEffect(() => {
        getRecomendados();

    }, [])

    return (
        <>
            {onClickPage &&

                <PopupPage domain={url} setOnClick={setOnClickPage} />
            }

            {!onClickPage &&
                <div className='row d-flex justify-content-center '>{recomendaciones.map(res => <Recomendation key={res.id} setUrl={setURL} setOnClick={setOnClickPage} web={res} />)}</div>}
        </>

    )
}
