import React, { useEffect, useState } from 'react'
import axios from "axios";
import Alert from "./alerts"
import "./popup.css";
import showAlert from './alerts';

export default function PopupWeb({ setOnClickGen, setOnClickWeb }) {

    //url de la api que controla las webs
    const baseURLWeb = "http://localhost:8080/api/website/"
    //url de la api que controla las categorias personales
    const baseURLCat = "http://localhost:8080/api/category/"

    //datos necesarios para la asignación de favoritos
    const [webName, setName] = useState("");
    const [webDomain, setDomain] = useState("");
    const [webDescription, setDescription] = useState("");
    const [webAge, setAge] = useState(false);

    //guarda el resultado de la llamada a las apis
    const [webCat, setCategoryWeb] = useState()
    const [categories, setCategory] = useState([]);

    //funcion que gestiona la información del formulario
    const submit = async () => {

        var json = { "title": webName, "domain": webDomain, "description": webDescription, "maxAge": webAge, "category": { "id": webCat } };
        
        try{
            await axios.post(baseURLWeb + "save", json)
            .then(res => {

                if (res.data === "SUCCESS")
                    showAlert("Página añadida")
                else
                    showAlert("Error al añadir la página")

            })
        }catch(err){

            showAlert("El dominio está mal escrito")

        }
       


    }

    //funcion que gestion la llamada de recogida de categorias 
    const getCategory = () => {

        axios.get(baseURLCat + "get/" + 1)
            .then(res => {
                setCategory(res.data)
            })

    }

    // sive para cerrar el popup
    const onClick = () => {

        setOnClickGen(true);
        setOnClickWeb(false)

    }


    useEffect(() => {
        getCategory();

    }, [])

    return (
        <>
            <div className="d-flex justify-content-center" >

                <div className="d-flex flex-column bg-light col-xl-3 col-md-4 col-7 col-lg-4 shadow p-3 mb-5 rounded " style={{ marginTop: "150px" }}>
                    <div className='row p-1'>
                        <h3 className='font-weight-bold  mt-2 col-11'>NUEVA WEB</h3>
                        <button type="button" onClick={onClick} className="btn btn-sm  text-danger btn-light col-1 btn-default btn-circle">X</button>

                    </div>

                    <div className="form-group">
                        <input type="text" onChange={e => setName(e.target.value)} className="form-control" id="inputName" placeholder="Introduzca el nombre de la web"></input>
                    </div>
                    <div className="form-group">
                        <input type="url" onChange={e => setDomain(e.target.value)} className="form-control" id="inputDomain" placeholder="Introduzca su dominio"></input>
                    </div>

                    <div className="form-group">
                        <textarea className="form-control" onChange={e => setDescription(e.target.value)} id="exampleFormControlTextarea1" rows="3" placeholder='Descripcion'></textarea>
                    </div>
                    <select className="form-control" defaultValue={'DEFAULT'} aria-label="Default select example" onChange={e => setCategoryWeb(e.target.value)}>
                        <option>Elige una categoria</option>
                        {categories.map(res => <option key={res.id} value={res.id}>{res.title}</option>)}
                    </select>

                    <div className="form-check mt-2">
                        <input type="checkbox" defaultChecked={webAge} onChange={e => setAge(!webAge)} className="form-check-input" id="inputEdad"></input>
                        <label className="form-check-label" >Mayor de edad</label>
                    </div>
                    <button type="submit" onClick={submit} className="mt-4 btn-block btn btn-primary">Guardar</button>

                </div>
            </div>
        </>
    )
}

