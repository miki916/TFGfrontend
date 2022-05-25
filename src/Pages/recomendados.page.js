import React, { useState, useEffect } from 'react'
import axios from "axios";

export default function Recomendados() {

    const baseURLWeb = "http://localhost:8080/api/website/"

    const [recomendaciones, setRecomendaciones] = useState("");

    const getRecomendados = async () =>{

        const loginString = sessionStorage.getItem('login')
        const user = JSON.parse(loginString)
        var json = {  "id": user.id }

        await axios.post(baseURLWeb + "get/recomendations", json)
            .then(res => {
                console.log(res);
                setRecomendaciones(res.data)
            })


    }


    useEffect(() => {
        getRecomendados();

    }, [])

    return (
        <div>recomendados.page</div>
    )
}
