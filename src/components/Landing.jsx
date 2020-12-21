import {React, useState} from 'react'
import { useHistory } from 'react-router-dom';
import {auth} from '../firebase';
export default function Landing(){

    const [text, setText]=useState("");

    const [email,setEmail]=useState("");         //email
    const [password,setPassword]= useState("");  //mobile
    const [first,setFirst]=useState("");         //first name
    const [sec,setSec]=useState("");             //last name
    const [scholar,setScholar]=useState("");     //scholar no.

    const history = useHistory();

    const handleChange=(e)=>{
        setText(e.target.value);
    }
    //register user with email and number as his password
    const register = (event)=>{
        event.preventDefault();
        auth.createUserWithEmailAndPassword(email,password)
        .then(auth=>{
            //creates a user and logged in 
            history.push('/instructions'); 

        })
        .catch((e)=>alert(e.message));
    };


    return(
    <div className='landing-page'>
        <h3>Hello {text} !</h3>
        <div className="d-flex justify-content-center">
            <div>
                <input onChange={handleChange} type="text" placeholder="First Name" />
                <input value={sec} onChange={event=>setSec(event.target.value)} type="text" placeholder="Last Name" />
                <select>
                    <option>Executive</option>
                    <option>Quizzer</option>
                    <option>Web Developer</option>
                    <option>Content Writer</option>
                    <option>Photographer</option>
                </select>
                <input value ={email} onChange={event=>setEmail(event.target.value)} type="email" placeholder="Email Address" />
                <input value={password} onChange={event=>setPassword(event.target.value)} type="tel" placeholder="Mobile Number" />
                <input value={scholar} onChange={event=>setScholar(event.target.value)} type="number" placeholder="Scholar Number" />
            </div>
        </div>
        <div className="d-flex justify-content-center"><a href="/verification"><button onClick={register}>Submit</button></a></div>
        <div className="brand">
            Quizzers' Club
            <br />
            <span style={{'color':'#E63946', 'fontSize':'1.4rem'}}>MANIT</span>
        </div>
    </div>
    )
}