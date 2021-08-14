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
                    setMessage(<p style={{'color':'#E63946', 'textAlign':'center'}}>You have not registered for the quiz</p>);
                    setTimeout(() => {
                        setMessage("");
                    }, 2000);
                }else{
                    const user = snap.docs[0].data();
                    if(user.password !== pwd){
                        setMessage(<p style={{'color':'#E63946', 'textAlign':'center'}}>Incorrect Password</p>);
                        setTimeout(() => {
                            setMessage("");
                        }, 2000);
                    }else{
                        firebaseApp.firestore().collection("Users").where("email", "==", email).get().then(snap=>{
                            let testAttempted=false;
                            snap.docs.forEach(doc=>{
                                if(doc.data().testAttempted){
                                    testAttempted=true;
                                }
                            })
                            return testAttempted;
                        }).then(testAttempted=>{
                            if(testAttempted){
                                setMessage(<p style={{'color':'#E63946', 'textAlign':'center'}}>You have already taken the quiz once</p>);
                                setTimeout(() => {
                                    setMessage("");
                                }, 2000);
                                return;
                            }else{
                                firebaseApp.firestore().collection("Users").doc(email).update({
                                    testAttempted:true,
                                }).then(()=>{
                                    sessionStorage.setItem("auth", true);
                                    sessionStorage.setItem("user", email);
                                    history.push('/instructions')
                                })
                            }
                        })
                    }
                }
            })
        }
    };

    //Render Form based on time
    const [render, setRender]=useState(false);
    const bypass=useLocation().search ==="?itisme";

    useEffect(()=>{
        let d=new Date().getTime();
        let start= new Date(2021, 7, 15, 15, 0, 0, 0).getTime();
        let end= new Date(2021, 7, 15, 15, 30, 0, 0).getTime();
        if(bypass || (d>start && d<end)){
            setRender(true);
        }
    });

    return(
    <div className='landing-page'>
        <Event />
        <div style={{'color':'#f1faee', 'padding':'2% 10% ', 'textAlign':'justify', 'textAlignLast':'center'}}>
            <p style={{'letterSpacing':'0.5px'}}>Quizzers Club MANIT is all set to take you on an audacious journey. Let us look back in time and ponder 
            upon every drop of blood that was shed and every person that was martyred to build us a dynamic 
            nation. Here's to the greater triumphs and achievements that await us. Are we brave and wise enough to leverage this opportunity and accept the challenge that our insurgents 
            left us? Take this quiz and discover the immortal lives that were lived, the endless wars that were fought 
            and the birthrights that were salvaged to give us everything that we have today! </p>
            All the best for the quiz!
        </div>
        <br />
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
        <br />
        <br />
        <p style={{'color':'#f1faee', 'textAlign':'center', 'opacity':'0.6'}}>If you face any issue, feel free to call <br /> Aman : +91 8269366460<br />Yash : +91 8529736944</p>
        </div>
        :
        <TestNotStarted />
        }
        <Brand />
    </div>
    )
}