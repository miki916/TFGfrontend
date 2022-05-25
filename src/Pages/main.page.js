import React, { useState } from 'react'
import NavIframe from '../Component/navIframe.component'

export default function Main() {

    const [iframe1, setIFrame1] = useState("");
    const [iframe2, setIFrame2] = useState("");
    const [iframe3, setIFrame3] = useState("");

    return (
        <>
            <div className='row  main-container p-0 m-0  container-fluid'>

                <div className='col-lg-4 col-12 m-0 p-0 '>
                    <NavIframe setIFrame={setIFrame1}></NavIframe>
                    <div className=" embed-responsive embed-responsive-21by9 m-0 h-100">

                        <iframe className='embed-responsive-item' src={iframe1}></iframe>

                    </div>
                </div>

                <div className='border-left border-right col-lg-4 col-12 m-0 p-0'>
                    <NavIframe setIFrame={setIFrame2}></NavIframe>
                    <div className="embed-responsive embed-responsive-21by9 m-0 h-100">

                        <iframe className='embed-responsive-item' src={iframe2}></iframe>

                    </div>
                </div>

                <div className='col-lg-4 col-12 m-0 p-0'>
                    <NavIframe setIFrame={setIFrame3}></NavIframe>
                    <div className="embed-responsive embed-responsive-21by9 m-0 h-100">

                        <iframe className='embed-responsive-item' src={iframe3}></iframe>

                    </div>
                </div>

            </div>
        </>
    )
}


