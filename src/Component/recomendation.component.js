import React from 'react'

export default function Recomendation({setUrl, setOnClick, web}) {

    // gestiona el boton visualizar pagina seteando la url
    const onClick = () => {

        setOnClick(true)
        setUrl(`${web.domain}`)
       
    }


    return (
        <div class="card col-xl-2 col-md-4 col-7 col-lg-3 m-4 shadow p-3 mb-5 rounded" >
                <div class="card-body">
                    <h5 class="card-title">{web.title}</h5>
                    <p class="card-text">{web.description}</p>
                    <button onClick={onClick} class="btn btn-primary btn-block">Visualizar página</button>
                </div>
        </div>
    )
}
