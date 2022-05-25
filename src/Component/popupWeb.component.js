import React, { useEffect, useState } from 'react'
import axios from "axios";
import "./popup.css";

export default function NewWebsite({ setOnClickWeb }) {

    const baseURLWeb = "http://localhost:8080/api/website/"
    const baseURLCat = "http://localhost:8080/api/category/"

    const [webName, setName] = useState("");
    const [webDomain, setDomain] = useState("");
    const [webDescription, setDescription] = useState("");
    const [webAge, setAge] = useState(false);
    const [result, setResult] = useState("")
    const [webCat, setCategoryWeb] = useState()

    const [categories, setCategory] = useState([]);

    const submit = async () => {

        var json = { "title": webName, "domain": webDomain, "description": webDescription, "maxAge": webAge, "category": { "id": webCat } };
        await axios.post(baseURLWeb + "save/", json)
            .then(res => {

                setResult(res.data)
                console.log(res.data);

            })

        if (result === "SUCCESS")
            alert("Página web añadida")
        else
            alert("Esta página ya ha sido añadida")
    }

    const getCategory = () => {

        axios.get(baseURLCat + "get/" + 1)
            .then(res => {
                setCategory(res.data)
            })

    }

    const onClick = () => {

        setOnClickWeb(false)

    }


    useEffect(() => {
        getCategory();

    }, [])

    return (
        <>
            <div className="modal-css">
                <div className="overlay-css"></div>

                <div className="modal-content-css">
                    <h3 className='font-weight-bold mt-2'>NUEVA WEB</h3>

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

                    <button className="close-modal-css btn  btn-circle" onClick={onClick}>
                        X
                    </button>
                </div>
            </div>
        </>
    )
}

