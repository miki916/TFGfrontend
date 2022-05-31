import axios from "axios";
import React, { Navigate, useState } from 'react'
import showAlert from "../Component/alerts";


export default function Login({ setLogin }) {

    const baseURL = "http://localhost:8080/api/user/"

    const [username, setUsername] = useState("");
    const [passwd, setPasswd] = useState("");


    const submit = async () => {

        var json = { "username": username, "passwd": passwd }
        
        await axios.post(`${baseURL}login`, json)
        .then(res =>{
            
            if (res.data != "") {

                setLogin(res.data)
                showAlert("Enhorabuena, has iniciado sesión")
                window.location.href = "http://localhost:3000/";
    
            } else
                showAlert("No has podido inciar sesión")
    
        })
   
    }


    return (
        <div className='d-flex justify-content-center text-center'>
            <div className="d-flex flex-column col-xl-2 col-md-4 col-7 col-lg-3 shadow p-3 mb-5 bg-white rounded" style={{ marginTop: "150px" }}>
                <h3 className='font-weight-bold mt-2'>BIENVENIDO</h3>
                <ul className="nav nav-pills nav-justified mb-3 mt-4" id="ex1" role="tablist">
                    <li className="nav-item" role="presentation">
                        <a className="nav-link active" id="tab-login" data-mdb-toggle="pill" href="/login" role="tab"
                            aria-controls="pills-login" aria-selected="true">Login</a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a className="nav-link" id="tab-register" data-mdb-toggle="pill" href="/register" role="tab"
                            aria-controls="pills-register" aria-selected="false">Register</a>
                    </li>
                </ul>

                <div className="tab-content">

                    <div className="form-outline mb-4">
                        <input type="text" id="loginName" onChange={e => setUsername(e.target.value)} className="form-control" placeholder='Nombre de usuario' />
                    </div>

                    <div className="form-outline mb-4">
                        <input type="password" id="loginPassword" onChange={e => setPasswd(e.target.value)} className="form-control" placeholder='Contraseña' />
                    </div>

                    <button  onClick={submit} className="btn btn-primary btn-block mb-4">Iniciar sesion</button>

                </div>
            </div>
        </div>
    )
}
