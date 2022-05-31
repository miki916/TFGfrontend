import React, { useEffect, useState } from 'react'
import axios from "axios";
import showAlert from './alerts';

export default function PopupFav({ setOnClickGen, setOnClickWeb }) {

    //url de la api que controla las webs
    const baseURLWeb = "http://localhost:8080/api/website/"
    //url de la api que controla las categorias personales
    const baseURLPersonal = "http://localhost:8080/api/personal/"

    //datos necesarios para la asignación de favoritos
    const [homePage, setHomePage] = useState("")
    const [web, setWebFav] = useState("")
    //guarda el resultado de la llamada a las apis
    const [webs, setWeb] = useState([])

    //funcion que gestion la llamada de recogida de favoritos
    const getWebsite = async () => {

        const loginString = sessionStorage.getItem('login')
        const user = JSON.parse(loginString)
        var json = { "user": { "id": user.id }, "idtype": 1 }

        await axios.post(baseURLWeb + "get/favorites", json)
            .then(res => {
                setWeb(res.data)
            })

    }

    //funcion que gestiona la información del formulario
    const submit = async () => {

        const loginString = sessionStorage.getItem('login')
        const user = JSON.parse(loginString)

        var json = { "type": "1", "user": { "id": user.id }, "homePage": homePage, "website": { "id": parseInt(web) } };
        try{

            await axios.post(baseURLPersonal + "save", json)
            .then(res => {
                if (res.data === "SUCCESS")
                    showAlert("Página añadida a favoritos")
                else
                    showAlert("Error al añadir la página favoritos")
            })
        }catch(err){

            showAlert("El dominio está mal escrito")

        }
       


    }



    // sive para cerrar el popup
    const onClick = () => {
        setOnClickGen(true)
        setOnClickWeb(false)

    }


    useEffect(() => {
        getWebsite();

    }, [])

    return (
        <div className="d-flex justify-content-center" >

            <div className="d-flex flex-column bg-light col-xl-3 col-md-5 col-7 col-lg-4 shadow p-3 mb-5  rounded " style={{ marginTop: "150px" }}>
                <div className='row p-1'>
                    <h3 className='font-weight-bold mt-2 col-11'>AÑADIR FAVORITO</h3>
                    <button type="button" onClick={onClick} className="btn btn-sm text-danger btn-light  col-1 btn-default btn-circle">X</button>

                </div>

                <div className="form-outline mb-4">
                    <input type="text" id="loginName" className="form-control" onChange={e => setHomePage(e.target.value)} placeholder='Pagina de inicio' />
                </div>

                <select defaultValue={'DEFAULT'} className="form-control" aria-label="Default select example" onChange={e => setWebFav(e.target.value)} >
                    <option >Elige una web</option>
                    {webs.map(res => <option key={res.id} value={res.id}>{res.title}</option>)}
                </select>
                <button type="submit" onClick={submit} className="btn btn-primary btn-block  mt-4">Guardar</button>


            </div>
        </div>
    )
}
