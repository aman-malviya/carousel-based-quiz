import React, {useState, useEffect} from 'react'
import Brand from './Brand'
import {db} from '../firebase'
import {useHistory} from "react-router-dom"

export default function Score(){
    const history =useHistory();
    window.addEventListener("popstate", e=>{
        history.push("/");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("sch");
    })
    //Score Calculation
    let score=0;
    const [points, setPoints] =useState(0);
    useEffect(()=>{
        //If user didn't answer no increment no decrement in points
        db.collection("AnswerBank/"+sessionStorage.getItem("name")+"-"+sessionStorage.getItem("sch")+"/Answers").where('userAns','==','').onSnapshot((snapshot)=>{
            snapshot.forEach((doc)=>{
                setPoints(score);
            })
        })
        //If user's answer is correct, +4
        db.collection("AnswerBank/"+sessionStorage.getItem("name")+"-"+sessionStorage.getItem("sch")+"/Answers").where('correct','==',true).onSnapshot((snapshot)=>{
            snapshot.forEach((doc)=>{
                score=score+4;
                setPoints(score);
            })
        })
        //If user's answer is incorrect, -1
        db.collection("AnswerBank/"+sessionStorage.getItem("name")+"-"+sessionStorage.getItem("sch")+"/Answers").where('correct','==',false).onSnapshot((snapshot)=>{
            snapshot.forEach((doc)=>{
                score=score-1;
                setPoints(score);
            })
        })
    },[])

    //Store the points in the database
    db.collection("scores").doc(sessionStorage.getItem("name")+"-"+sessionStorage.getItem("sch")).set({
        points:points,
        name:sessionStorage.getItem("name")+"-"+sessionStorage.getItem("sch")
    });
    
    return (<div className="d-flex justify-content-center landing-page">
        <div>
            <h1 style={{'color':'#E63946', 'fontWeight':'bolder', 'textAlign':'center','fontSize':'3rem'}}>
                V<span style={{'fontSize':'2.5rem'}}>I</span>H<span style={{'fontSize':'2.5rem'}}>AA</span>N
            </h1>
            <div className="d-flex justify-content-center">
                <img alt="trophy-img" width="150px" height="150px" src="trophy.png" />
            </div>
            <h3></h3>
            <div style={{'border':'2px solid rgba(69, 123, 157,0.5)', 'borderRadius':'8px','height':'60px', 'width':'200px', 'margin':'auto', 'padding':'12px', 'color':'#f1faee'}}>
                <h4 style={{'textAlign':'center'}}>{points}</h4>
            </div>
            <h6 style={{'color':'#f1faee', 'padding':'20px 50px', 'textAlign':'center'}}        >Thankyou for taking the Test.
                <br />
                <br />
                Team Quizzers' Club MANIT will release the dashboard soon.<br /><br />Stay tuned.
            </h6>    
        </div>
        <Brand />
   </div>)
}