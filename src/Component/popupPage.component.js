import React from 'react'

export default function PopupPage({ domain, setOnClick }) {

    const onClick = () => {

        setOnClick(false)

    }

  
    return (
        <div className="d-flex justify-content-center" >

                <div className="d-flex flex-column col-xl-8 col-md-7 col-10 col-lg-7 shadow p-3 mb-5 bg-white rounded " style={{ marginTop: "150px" }}>

                <div className="embed-responsive embed-responsive-21by9 m-0 ">

                    <iframe className='embed-responsive-item' src={domain}></iframe>

                </div>

                <button className="btn btn-outline-danger m-2" onClick={onClick}>
                    Salir
                </button>
            </div>
        </div>
    )
}
