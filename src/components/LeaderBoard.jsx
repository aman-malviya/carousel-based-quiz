import React, {useEffect, useState} from "react"
import Event from './Event'
import Brand from './Brand'
import {db}  from '../firebase'

export default function LeaderBoard(){
    const [scores, setScores]=useState([]);
    useEffect(()=>{
            db.collection("scores").limit(30).orderBy("score", "desc").onSnapshot((snapshot)=>{
                snapshot.forEach((doc)=>{
                    scores.push(doc.data());
                    setScores(scores);
                })
            })
    },[])
    console.log(scores);
    
    return(<div>
        <br />
        <Event />
        <div className="landing-page">
            {scores.map((score)=>{
                return <div className="score" style={{'display':'grid', 'grid-template-columns':'auto auto', 'margin':'auto'}}>
                    <div>{score.name}</div>
                    <div>{score.points}</div>
                </div>
            })}        
        </div>
        <Brand />
    </div>)
}