import {React, useState} from 'react'
import { useHistory } from 'react-router-dom';
import {auth, db} from '../firebase';
export default function Landing(){

    const [text, setText]=useState("");

    const [email,setEmail]=useState("");         //email
    const [tel,setTel]= useState("");           //mobile
    const [first,setFirst]=useState("");         //first name
    const [last,setLast]=useState("");             //last name
    const [post,setPost]=useState("");             //post
    const [scholar,setScholar]=useState("");     //scholar no.

    const history = useHistory();

    const handleChange=(e)=>{
        setText(e.target.value);
        setFirst(e.target.value);
    }
    //register user with email and number as his password
    const register = (event)=>{
        event.preventDefault();
        db.collection("user-details").add({
            firstName: first,
            lastName: last,
            post:post,
            email:email,
            mobile: tel,
            scholar: scholar
        })
        history.push('/instructions');
    };


    return(
    <div className='landing-page' style={window.innerWidth<500?{'paddingBottom':'35%'}:{'paddingBottom':'15%'}}>
        <h1 style={{'color':'#E63946', 'fontWeight':'bolder', 'textAlign':'center','fontSize':'3rem'}}>
            V<span style={{'fontSize':'2.5rem'}}>I</span>H<span style={{'fontSize':'2.5rem'}}>AA</span>N
        </h1>
        <div style={{'color':'#f1faee', 'padding':'2% 10%', 'textAlign':'center'}}>
            <p>VIHAAN is QCM's opening event for session( It take place even before fresher's evening). The event is organized for the first year students to participate , learn and to let them know what awaits them in future. VIHAAN is a platform for the students, amateurs, quizzers and newcomers to mettle in quizzing.</p>
        </div>
        <h3>Hello {text} !</h3>
        <div className="d-flex justify-content-center">
            <div>
                <input value={first} onChange={handleChange} type="text" placeholder="First Name" />
                <input value={last} onChange={event=>setLast(event.target.value)} type="text" placeholder="Last Name" />
                <select value={post} onChange={event=>setPost(event.target.value)}>
                    <option value="Executive">Executive</option>
                    <option value="Quizzer">Quizzer</option>
                    <option value="Web Developer">Web Developer</option>
                    <option value="Content Writer">Content Writer</option>
                    <option value="Photographer">Photographer</option>
                </select>
                <input value ={email} onChange={event=>setEmail(event.target.value)} type="email" placeholder="Email Address" />
                <input value={tel} onChange={event=>setTel(event.target.value)} type="tel" placeholder="Mobile Number" />
                <input value={scholar} onChange={event=>setScholar(event.target.value)} type="number" placeholder="Scholar Number" />
            </div>
        </div>
        <div className="d-flex justify-content-center"><a><button onClick={register}>Submit</button></a></div>
        <div className="brand">
            Quizzers' Club
            <br />
            <span style={{'color':'#E63946', 'fontSize':'1.4rem'}}>MANIT</span>
        </div>
    </div>
    )
}