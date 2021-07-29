import React, {useEffect, useState} from "react"
import {db}  from '../firebase'
import { useLocation } from "react-router-dom";

export default function LeaderBoard(){
    const [points, setPoints]=useState([]);
    const showScore=useLocation().search === "?showUserScores"
    useEffect(()=>{
            db.collection("scores").doc("null-null").delete();
            db.collection("Users").orderBy("score", "desc").onSnapshot((snapshot)=>{
                let scores=[];
                snapshot.forEach((doc)=>{
                    scores.push(doc.data());
                })
                setPoints(scores);
            })
    },[])
    
    return(<div style={{'width':'1840px','minHeight':'100vh','background':'url(./bg.png)', 'backgroundRepeat':'no-repeat', 'backgroundSize':'cover', 'backgroundPositionY':'bottom'}}>
        <div>
            <div style={{'display':'grid', 'gridTemplateColumns':'100px 300px 100px 300px 200px 400px 150px 150px 100px', 'margin':'auto', 'backgroundColor':'#06b6a0','color':'#eee' , 'textAlign':'left', 'padding':'10px 20px'}}>
                    <div>S.No.</div>
                    <div>Name</div>
                    <div style={{'visibility':showScore?'visible':'hidden'}}>Score</div>
                    <div>Email</div>
                    <div>Phone</div>
                    <div>College</div>
                    <div>City</div>
                    <div>State</div>
                    <div style={{'visibility':showScore?'visible':'hidden'}}>Time taken</div>
            </div>
            {points.map((score, i)=>{
                return <div style={{'border':'2px solid rgba(69, 123, 157,0.7)','display':'grid', 'grid-template-columns':'100px 300px 100px 300px 200px 400px 150px 150px 100px', 'margin':'auto', 'textAlign':'left', 'fontSize':'0.9rem', 'color':'#eee', 'padding':'10px 20px'}}>
                    <div>{(i+1)}</div>
                    <div>{score.name}</div>
                    <div style={{'visibility':showScore?'visible':'hidden'}}>{score.score}</div>
                    <div>{score.email}</div>
                    <div>{score.phone}</div>
                    <div>{score.college}</div>
                    <div>{score.city}</div>
                    <div>{score.state}</div>
                    <div style={{'visibility':showScore?'visible':'hidden'}}>{((score.submitTime.seconds - score.inTime.seconds)/60).toFixed(2)} minutes</div>
                </div>
            })}        
        </div>
    </div>)
}