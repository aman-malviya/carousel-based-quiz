import React, {useState} from 'react'
import {db,auth} from '../firebase'
import {useHistory} from 'react-router-dom'
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
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] =useState();
    // const handleClick=(e)=>{
    //     e.preventDefault();
    //     db.collection("admin-credentials").onSnapshot((snapshot)=>{
    //     snapshot.forEach((doc)=>{
    //         if(doc.data().LoginId===email && doc.data().Password === password){
    //             history.push("/admin");
    //         }else{
    //             setMessage(<p style={{'color':'#E63946', 'textAlign':'center'}}>Wrong Credentials</p>);
    //             setTimeout(()=>{
    //               setMessage("");
    //             },2000)
    //         }
    //     })
    // }) 
    // }
    const signIn = (e) => {
        e.preventDefault();

        
            auth.signInWithEmailAndPassword(email, password)
            .then(auth => {
                history.push('/admin')
            })
            .catch(error => alert(error.message))
    }
    return <div>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} type="text" placeholder="QCM Unique ID" />
        <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" />
        <a>
            <button onClick={signIn}>
                Login
            </button>
        </a>
        {message}
    </div>
}

