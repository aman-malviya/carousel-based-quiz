import React, {useState, useEffect} from 'react'

export default function AdminAuth(){

    return(<div className="landing-page">
        <div className="d-flex justify-content-center">
            <LoginPage />
        </div>
        <div className="brand">
            Quizzers' Club
            <br />
            <span style={{'color':'#E63946', 'fontSize':'1.4rem'}}>
                MANIT
            </span>
        </div>
    </div>)
}

const LoginPage=()=>{
    let isRegisterd=true;
    const [isTrue, setTrue]=useState();
    const handleClick=()=>{
        isRegisterd?setTrue(<p></p>):setTrue(<p style={{'color':'#E63946'}}>Wrong Credentials</p>);
    }
    return <div>
        <input type="text" placeholder="QCM Unique ID" />
        <input type="password" placeholder="Password" />
        <a href={isRegisterd?"/admin":""}>
            <button onClick={handleClick}>
                Login
            </button>
        </a>
        {isTrue}
    </div>
}

