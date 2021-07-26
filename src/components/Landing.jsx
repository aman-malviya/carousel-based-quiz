import {React, useState, useEffect} from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import firebaseApp from '../firebase';
import Brand from './Brand'
import Event from './Event'
import TestNotStarted from './TestNotStarted'

export default function Landing(){
    const [email,setEmail]=useState("");         //email
    const [pwd, setPwd]=useState("");
    const [message, setMessage]=useState("");

    const history = useHistory();

    //Email Validation
    function validateEmail(emailAdd) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(emailAdd).toLowerCase());
    }

    //register user 
    const register = (event)=>{
        event.preventDefault();
        if(email==="" || pwd === ""){
            setMessage(<p style={{'color':'#E63946', 'textAlign':'center'}}>Fill all the details first.</p>);
            setTimeout(() => {
                   setMessage("");
               }, 2000);
        }else if(validateEmail(email)===false){
            setMessage(<p style={{'color':'#E63946', 'textAlign':'center'}}>Invalid Email.</p>);
            setTimeout(() => {
                   setMessage("");
            }, 2000);
        }else{
            firebaseApp.firestore().collection("Users").where("email", "==", email).get().then((snap)=>{
                if(!snap.size){
                    setMessage(<p style={{'color':'#E63946', 'textAlign':'center'}}>You have not registered for the quiz.</p>);
                    setTimeout(() => {
                        setMessage("");
                    }, 2000);
                }else{
                    console.log(snap);
                }
            })
        }
    };

    //Render Form based on time
    const [render, setRender]=useState(false);
    const bypass=useLocation().search ==="?bypass";

    useEffect(()=>{
        let d=new Date().getTime();
        let startSlot1= new Date(2021, 6, 6, 16, 0, 0, 0).getTime();
        let endSlot1= new Date(2021, 6, 6, 16, 30, 0, 0).getTime();
        let startSlot2= new Date(2021, 6, 6, 20, 0, 0, 0).getTime();
        let endSlot2= new Date(2021, 6, 6, 20, 30, 0, 0).getTime();
        if((bypass)){
            setRender(true);
        }
    });

    return(
    <div className='landing-page'>
        <Event />
        <div style={{'color':'#f1faee', 'padding':'2% 10% ', 'textAlign':'justify', 'textAlignLast':'center'}}>
            <p>After another year of a successful journey, its finally time to pass the baton. Quizzers’ Club MANIT, the only quizzing club of NIT Bhopal is all set to recruit new members. So, wait till the slots open, and then brainstorm over those riveting 30 questions on Mental Ability and General Knowledge.<br />All the best!</p>
        </div>
        {render?<div>
        <div className="d-flex justify-content-center">
            <div>
                <input type="email" value ={email} onChange={event=>setEmail(event.target.value)}  placeholder="Email Address" required />
                <input value={pwd} onChange={event=>setPwd(event.target.value)} type="password" placeholder="Password" required />
            </div>
        </div>
        <div className="d-flex justify-content-center"><button onClick={register}>Submit</button></div>
        {message}
        <br />
        <p style={{'color':'#f1faee', 'textAlign':'center'}}>If you face any issue, feel free to call <br /> Aman : +91 8269366460<br />Yash : +91 8529736944</p>
        </div>
        :
        <TestNotStarted />
        }
        <Brand />
    </div>
    )
}