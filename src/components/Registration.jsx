import {React, useState, useEffect} from 'react'
import {useLocation } from 'react-router-dom';
import firebaseApp from '../firebase';
import Brand from './Brand'
import Event from './Event'
import RegClosed from './RegClosed'
import {cities, states} from '../cities'

export default function Landing(){
    const [name, setName]=useState("");
    const [college, setCollege]=useState("");
    const [email,setEmail]=useState("");         //email
    const [tel,setTel]= useState("");           //mobile
    const [city,setCity]=useState("");         //first name
    const [state,setState]=useState("");             //last name
    const [pwd,setPwd]=useState("");             //post
    const [rpwd,setRpwd]=useState("");     //scholar no.
    const [message, setMessage] =useState();
    const [reg, setreg] = useState(localStorage.getItem("registered"));

    const handleChange=(e)=>{
        setName(e.target.value);
    }

    //Email Validation
    function validateEmail(emailAdd) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(emailAdd).toLowerCase());
    }

    //register user 
    const register = (event)=>{
        event.preventDefault();
        firebaseApp.firestore().collection("Users").where("email", "==", email).get().then((snapshot)=>{
            if(snapshot.size){
                setMessage(<p style={{'color':'#E63946', 'textAlign':'center'}}>You have already registered</p>);
                setTimeout(() => {
                    setMessage("");
                }, 2000);
                return snapshot.size;
            }
        }).then((size)=>{
            let flag=true;
            if(size){
                flag=false;
            }
            if(pwd !== rpwd){
                flag=false;
                setMessage(<p style={{'color':'#E63946', 'textAlign':'center'}}>Passwords do not match.</p>);
                setTimeout(() => {
                    setMessage("");
                }, 2000);
                return;
            }
            if(name==="" || college==="" || city==="" || email==="" || tel==="" || state==="" || pwd==="" || rpwd === ""){
                flag=false;
                setMessage(<p style={{'color':'#E63946', 'textAlign':'center'}}>Fill all the details first.</p>);
                setTimeout(() => {
                       setMessage("");
                }, 2000);
                return;
            }
            
            if(validateEmail(email)===false){
                flag=false;
                setMessage(<p style={{'color':'#E63946', 'textAlign':'center'}}>Invalid Email.</p>);
                setTimeout(() => {
                       setMessage("");
                }, 2000);
                return;
            }
            
            if(tel<1000000000 || tel>999999999999){
                flag=false;
                setMessage(<p style={{'color':'#E63946', 'textAlign':'center'}}>Invalid Mobile Number.</p>);
                setTimeout(() => {
                       setMessage("");
                }, 2000);
                return;
            }
    
            if(flag){
                firebaseApp.firestore().collection("Users").doc().set({
                    name: name,
                    college: college,
                    email:email,
                    phone:tel,
                    state: state,
                    city: city,
                    password:pwd
                }).then(()=>{
                    localStorage.setItem("registered", true);
                    setreg(true);
                })
            }
        })

        
    };

    //Render Form based on time
    const [render, setRender]=useState(false);
    const bypass=useLocation().search ==="?bypass";
    useEffect(()=>{
        let d=new Date().getTime();
        let regClose= new Date(2021, 7, 14, 23, 59, 0, 0).getTime();

        if(d<regClose || bypass){
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
        </div>
        {reg?
        <RegClosed info="You have successfully registered" />
        :render?<div>
        <h3>Hello {name} !</h3>
        <div className="d-flex justify-content-center">
            <div>
                <input value={name} onChange={handleChange} type="text" placeholder="Name" required />
                <input value={college} onChange={event=>setCollege(event.target.value)} type="text" placeholder="College" required />
                <input type="email" value ={email} onChange={event=>setEmail(event.target.value)}  placeholder="Email Address" required />
                <input value={tel} onChange={event=>setTel(event.target.value)} type="tel" placeholder="Mobile Number" required />
                <select value={state} onChange={event=>setState(event.target.value)} required>
                    <option value="">Select a state</option>
                    {states.map(st=>{
                        return <option value={st}>{st}</option>
                    })}
                </select>
                <br />
                <select value={city} onChange={event=>setCity(event.target.value)} required>
                    <option value="">Select a city</option>
                    {cities.map(c=>{
                        if(c.state === state){
                            return <option value={c.name}>{c.name}</option>
                        }
                        return null;
                    })}
                </select>
                <input value={pwd} onChange={event=>setPwd(event.target.value)} type="password" placeholder="Create Password" required />
                <input value={rpwd} onChange={event=>setRpwd(event.target.value)} type="password" placeholder="Re-enter Password" required />
            </div>
        </div>
        <div className="d-flex justify-content-center"><button onClick={register}>Register</button></div>
        {message}
        <br />
        </div>
        :
        <RegClosed info="Registrations Closed." />
        }
        <Brand />
    </div>
    )
}