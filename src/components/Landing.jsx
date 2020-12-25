import {React, useState} from 'react'
import { useHistory } from 'react-router-dom';
import {db} from '../firebase';


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
        }else if(scholar<200000000 || scholar>300000000){
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
            db.collection("User-Credentials").where('scholar', '==', scholar).onSnapshot((snapshot)=>   {
            let items=[];
            snapshot.forEach((doc)=>items.push(doc.data()));
            if(items.length){
               setMessage(<p style={{'color':'#f1faee', 'textAlign':'center'}}>You have already taken the test once.</p>);
               setTimeout(() => {
                   setMessage("");
               }, 2000);
            }else{
               db.collection("User-Credentials").add({
                    firstName: first,
                    lastName: last,
                    post:post,
                    email:email,
                    mobile: tel,
                    scholar: scholar
                })
                history.push('/instructions');
            }
        })
        
        }
    };


    return(
    <div className='landing-page'>
        <h1 style={{'color':'#E63946', 'fontWeight':'bolder', 'textAlign':'center','fontSize':'3rem'}}>
            V<span style={{'fontSize':'2.5rem'}}>I</span>H<span style={{'fontSize':'2.5rem'}}>AA</span>N
        </h1>
        <div style={{'color':'#f1faee', 'padding':'2% 10%', 'textAlign':'center'}}>
            <p>VIHAAN is QCM's opening event for session( It take place even before fresher's evening). The event is organized for the first year students to participate , learn and to let them know what awaits them in future. VIHAAN is a platform for the students, amateurs, quizzers and newcomers to mettle in quizzing.</p>
        </div>
        <h3>Hello {text} !</h3>
        <div className="d-flex justify-content-center">
            <div>
                <input value={first} onChange={handleChange} type="text" placeholder="First Name" required />
                <input value={last} onChange={event=>setLast(event.target.value)} type="text" placeholder="Last Name" required />
                <select value={post} onChange={event=>setPost(event.target.value)} required>
                    <option value="">Select an option</option>
                    <option value="Executive">Executive</option>
                    <option value="Quizzer">Quizzer</option>
                    <option value="Web Developer">Web Developer</option>
                    <option value="Content Writer">Content Writer</option>
                    <option value="Photographer">Photographer</option>
                </select>
                <input type="email" value ={email} onChange={event=>setEmail(event.target.value)}  placeholder="Email Address" required />
                <input value={tel} onChange={event=>setTel(event.target.value)} type="tel" placeholder="Mobile Number" required />
                <input min="200000000" max="300000000" value={scholar} onChange={event=>setScholar(event.target.value)} type="number" placeholder="Scholar Number" required />
            </div>
        </div>
        <div className="d-flex justify-content-center"><button onClick={register}>Submit</button></div>
        {message}
        <br />
        <p style={{'color':'#f1faee', 'textAlign':'center'}}>If you face any issue, feel free to call <br /> Aman : +91 8269366460<br />Yash : +91 8529736944</p>
        <div className="brand">
            Quizzers' Club
            <br />
            <span style={{'color':'#E63946', 'fontSize':'1.4rem'}}>MANIT</span>
        </div>
    </div>
    )
}