import React,{useState} from 'react'
import {db} from '../firebase'
import firebase from 'firebase'
export default function Admin(){
    const [evt,setEvt]=useState("");
    const [question,setQuestion] = useState("");
    const [a,setA] = useState("");
    const [b,setB] = useState("");
    const [c,setC] = useState("");
    const [d,setD] = useState("");
    const [ans,setAns] = useState("");

    const addQuestion=(event)=>{
        event.preventDefault();
        db.collection('vihan').add({
            event: evt,
            question: question,
            A: a,
            B: b,
            C: c,
            D: d,
            ans:ans,

        }).then(alert("added sucessfully")).catch((e)=>alert(e.message))
        console.log("done")
        setEvt("");
        setQuestion("")
        setA("");
        setB("");
        setC("");
        setD("");
        setAns("");

        }
    return(<div className="landing-page">
                <h3>Have a good question in mind? Bring it On.</h3>
                <form>
                <div className="d-flex justify-content-center">
                    <div>
                        <input value={evt} onChange={event=>setEvt(event.target.value)} type="text" placeholder="Event Name" />
                        <textarea value={question} onChange={event=>setQuestion(event.target.value)} type="text" placeholder="Question" />
                        <input value ={a} onChange={(event)=>setA(event.target.value)} type="text" placeholder="Option 1" />
                        <input value={b} onChange={(event)=>setB(event.target.value)} type="text" placeholder="Option 2" />
                        <input value={c} onChange={(event)=>setC(event.target.value)} type="text" placeholder="Option 3" />
                        <input value={d} onChange={(event)=>setD(event.target.value)} type="text" placeholder="Option 4" />
                        <select onClick={e=>setAns(e.target.value)}>
                            {/* <option>Select the correct option</option> */}
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                            <option value="D">D</option>
                        </select>
                    </div>
                </div>
                <div className="d-flex justify-content-center">
                    <a href="/verification">
                        <button onClick={addQuestion}>Push to the Database</button>
                    </a>
                </div>
                <div className="brand">
                    Quizzers' Club
                    <br />
                    <span style={{'color':'#E63946', 'fontSize':'1.4rem'}}>
                        MANIT
                    </span>
                </div>
                </form>
            </div>
        );
}