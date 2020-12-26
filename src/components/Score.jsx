import React, {useState} from 'react'
import {db} from '../firebase'

export default function Score(){
    let score=0;
    db.collection("AnswerBank/"+sessionStorage.getItem("sch")+"/Answers").onSnapshot((snapshot)=>{
        snapshot.forEach((doc)=>{
            let user=doc.data().userAns;
            let actual=doc.data().actualAns;
            console.log(user, actual, sessionStorage.getItem("sch"));
            if(user===actual){
                console.log("Query succeeds");
                score++;
                console.log(score);
            }
        })
    })
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
                <h4 style={{'textAlign':'center'}}>{score}</h4>
            </div>
            <h6 style={{'color':'#06d6a0', 'padding':'20px 50px', 'textAlign':'center'}}        >Thankyou for taking the Test.
                <br />
                <br />
                Team Quizzers' Club MANIT will release the dashboard soon.<br /><br />Stay tuned.
            </h6>    
        </div>
        <div className="brand">
            Quizzers' Club
            <br />
            <span style={{'color':'#E63946', 'fontSize':'1.4rem'}}>MANIT</span>
        </div>
   </div>)
}