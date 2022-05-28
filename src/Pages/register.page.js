import React, { useState } from 'react'
import axios from "axios";

export default function Register() {

    const baseURL = "http://localhost:8080/api/user/"

    const [username, setUsername] = useState("");
    const [passwd, setPasswd] = useState("");
    const [passwd2, setPasswd2] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [news, setNews] = useState(false)

    const [result, setResult] = useState("")

    const submit = async () => {

        if (passwd === passwd2) {

            var json = {
                "username": username,
                "email": email,
                "passwd": passwd,
                "birthday": birthday,
                "news": news,
                "d_creation": new Date().toISOString(), "last_log": new Date().toISOString()
            };

            await axios.post(baseURL + "register", json)
                .then(res => {
                    setResult(res.data)
                })

        } else
            setResult("PASSWD_ERR")


        if (result === "SUCCESS") {

            alert("Registro satisfactorio");

        } else if (result === "NOT_SUCCESS") {

            alert("Este nombre de usuario ya existe")

        }
        else if (result === "PASSWD_ERR") {

            alert("La contraseñas no son las mismas")

        }
    }



    return (
        <div className='d-flex justify-content-center text-center'>
            <div className="d-flex flex-column col-xl-3 col-md-5 col-8 col-lg-4 shadow p-3 mb-5 bg-white rounded" style={{ marginTop: "150px" }}>
                <h3 className='font-weight-bold mt-2'>REGISTRATE</h3>

                <ul className="nav nav-pills nav-justified mb-3 mt-4" id="ex1" role="tablist">
                    <li className="nav-item" role="presentation">
                        <a className="nav-link " href="/login" >Login</a>
                    </li>
                    <li className="nav-item" role="presentation">
                        <a className="nav-link active" href="/register" >Register</a>
                    </li>
                </ul>
                <div className="tab-content">

                    <div className="form-outline mb-4">
                        <input type="text" id="registerName" onChange={e => setUsername(e.target.value)} className="form-control" placeholder='Nombre de usuario' />
                    </div>

                    <div className="form-outline mb-4">
                        <input type="email" id="registerUsername" onChange={e => setEmail(e.target.value)} className="form-control" placeholder='Email' />
                    </div>

                    <div className="form-outline mb-4">
                        <input type="password" id="registerEmail" onChange={e => setPasswd(e.target.value)} className="form-control" placeholder='Contraseña' />
                    </div>

                    <div className="form-outline mb-4">
                        <input type="password" id="registerPassword" onChange={e => setPasswd2(e.target.value)} className="form-control" placeholder='Repita la contraseña' />
                    </div>

                    <div className="form-outline mb-4">
                        <input type="date" id="registerPassword2" onChange={e => setBirthday(e.target.value)} className="form-control" />
                    </div>

                    <div className="form-check d-flex  mb-4">
                        <input className="form-check-input me-2" onChange={e => setNews(!news)} type="checkbox" value="" id="registerCheck" aria-describedby="registerCheckHelpText" />
                        <label className="form-check-label" for="registerCheck"> Me gustaría recibir noticias </label>
                    </div>

                    <button type="submit" onClick={submit} className="btn btn-primary btn-block mb-3">Registrarse</button>

                </div>
            </div>
        </div>
    )
}
