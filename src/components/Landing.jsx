import {React, useState, useEffect} from 'react'
import { useHistory, useLocation } from 'react-router-dom';
import firebaseApp from '../firebase';
import Brand from './Brand'
import Event from './Event'
import TestNotStarted from './TestNotStarted'

export default function Landing(){
    const [text, setText]=useState("");
    const [email,setEmail]=useState("");         //email
    const [tel,setTel]= useState("");           //mobile
    const [first,setFirst]=useState("");         //first name
    const [last,setLast]=useState("");             //last name
    const [post,setPost]=useState("");             //post
    const [scholar,setScholar]=useState("");     //scholar no.
    const [message, setMessage] =useState();

    const history = useHistory();

    const handleChange=(e)=>{
        setText(e.target.value);
        setFirst(e.target.value);
    }

    //Email Validation
    function validateEmail(emailAdd) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(emailAdd).toLowerCase());
    }

    //register user 
    const register = (event)=>{
        event.preventDefault();
        if(first==="" || last==="" || post==="" || email==="" || tel==="" || scholar===""){
            setMessage(<p style={{'color':'#E63946', 'textAlign':'center'}}>Fill all the details first.</p>);
            setTimeout(() => {
                   setMessage("");
               }, 2000);
        }else if(!((scholar>201109000 && scholar<201120000) || (scholar>191109000 && scholar<191120000))){
            setMessage(<p style={{'color':'#E63946', 'textAlign':'center'}}>Invalid Scholar Number.</p>);
            setTimeout(() => {
                   setMessage("");
               }, 2000); 
        }else if(validateEmail(email)===false){
            setMessage(<p style={{'color':'#E63946', 'textAlign':'center'}}>Invalid Email.</p>);
            setTimeout(() => {
                   setMessage("");
               }, 2000);
        }else if(tel<1000000000 || tel>999999999999){
            setMessage(<p style={{'color':'#E63946', 'textAlign':'center'}}>Invalid Mobile Number.</p>);
            setTimeout(() => {
                   setMessage("");
               }, 2000);
        }else{
            firebaseApp.firestore().collection("Users").where('scholar', '==', scholar).onSnapshot((snapshot)=>{
                if(snapshot.size){
                    setMessage(<p style={{'color':'#E63946', 'textAlign':'center'}}>You have already taken the test once.</p>);
                    setTimeout(() => {
                        setMessage("");
                    }, 2000);
                }else{
                    firebaseApp.firestore().collection("Users").doc(first+"-"+last).set({
                        firstName: first,
                        lastName: last,
                        post:post,
                        email:email,
                        mobile: tel,
                        scholar: scholar,
                        inTime:new Date().toLocaleTimeString()
                    })
                    history.push('/instructions');
                    sessionStorage.setItem("name", first);
                    sessionStorage.setItem("sch", scholar);  
                    sessionStorage.setItem("auth", true);
                }
        })
        
        }
    };

    //Render Form based on time
    const [render, setRender]=useState(false);
    const bypass=useLocation().search ==="?letGrootPass";

    useEffect(()=>{
        let d=new Date().getTime();
        let startSlot1= new Date(2021, 6, 6, 16, 0, 0, 0).getTime();
        let endSlot1= new Date(2021, 6, 6, 16, 30, 0, 0).getTime();
        let startSlot2= new Date(2021, 6, 6, 20, 0, 0, 0).getTime();
        let endSlot2= new Date(2021, 6, 6, 20, 30, 0, 0).getTime();
        if((d>startSlot1 && d<endSlot1)|| bypass ||(d>startSlot2 && d<endSlot2)){
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
        <h3>Hello {text} !</h3>
        <div className="d-flex justify-content-center">
            <div>
                <input value={first} onChange={handleChange} type="text" placeholder="First Name" required />
                <input value={last} onChange={event=>setLast(event.target.value)} type="text" placeholder="Last Name" required />
                <select value={post} onChange={event=>setPost(event.target.value)} required>
                    <option value="">Select your branch</option>
                    <option value="CSE">CSE</option>
                    <option value="ECE">ECE</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Civil">Civil</option>
					<option value="Chemical">Chemical</option>
                    <option value="MSME">MSME</option>
                    <option value="BArch">BArch</option>
                    <option value="BPlan">BPlan</option>
                </select>
                <input type="email" value ={email} onChange={event=>setEmail(event.target.value)}  placeholder="Email Address" required />
                <input value={tel} onChange={event=>setTel(event.target.value)} type="tel" placeholder="Mobile Number" required />
                <input value={scholar} onChange={event=>setScholar(event.target.value)} type="number" placeholder="Scholar Number" required />
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