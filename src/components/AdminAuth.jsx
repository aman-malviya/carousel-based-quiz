import React, {useState} from 'react'
// import {auth} from '../firebase'
// import {useHistory} from 'react-router-dom'
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
    let isRegisterd=false;
    // const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isTrue, setTrue]=useState();
    const handleClick=()=>{
        isRegisterd?setTrue(<p></p>):setTrue(<p style={{'color':'#E63946'}}>Wrong Credentials</p>);
    }
    // const signIn = e => {
    //     e.preventDefault();

    //     auth
    //         .signInWithEmailAndPassword(email, password)
    //         .then(auth => {
    //             history.push('/admin')
    //         })
    //         .catch(error => alert(error.message))
    // }

    return <div>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text" placeholder="QCM Unique ID" />
        <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" />
        <a href={isRegisterd?"/admin":""}>
            <button onClick={handleClick}>
                Login
            </button>
        </a>
        {isTrue}
    </div>
}

