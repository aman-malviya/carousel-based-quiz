import React, {useEffect, useState} from "react"
import Event from './Event'
import Brand from './Brand'
import {db}  from '../firebase'

export default function LeaderBoard(){
    const [points, setPoints]=useState([]);
    useEffect(()=>{
            db.collection("scores").doc("null-null").delete();
            db.collection("scores").orderBy("points", "desc").limit(30).onSnapshot((snapshot)=>{
                let scores=[];
                snapshot.forEach((doc)=>{
                    scores.push(doc.data());
                })
                setPoints(scores);
            })
    },[])
    
    return(<div>
        <br />
        <Event />
        <div className="landing-page">
            <div className="score" style={{'display':'grid', 'gridTemplateColumns':'3fr 1fr', 'margin':'auto', 'backgroundColor':'#06b6a0', 'border':'none', 'textAlign':'left'}}>
                    <div>Student</div>
                    <div style={{'textAlign':'center'}}>Points</div>
            </div>
            {points.map((score)=>{
                return <div className="score" style={{'display':'grid', 'grid-template-columns':'3fr 1fr', 'margin':'auto', 'textAlign':'left'}}>
                    <div>{score.name}</div>
                    <div style={{'textAlign':'center'}}>{score.points}</div>
                </div>
            })}        
        </div>
        <Brand />
    </div>)
}