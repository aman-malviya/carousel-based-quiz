import React, {useEffect, useState} from "react"
import Event from './Event'
import Brand from './Brand'
import {db}  from '../firebase'

export default function LeaderBoard(){
    const [points, setPoints]=useState([]);
    useEffect(()=>{
            db.collection("scores").onSnapshot((snapshot)=>{
                snapshot.forEach((doc)=>{
					let scores=[];
                    scores.push(doc.data());
                    setPoints(scores);
                })
            })
    },[])
    console.log(points);
    
    return(<div>
        <br />
        <Event />
        <div className="landing-page">
            {points.map((score)=>{
                return <div className="score" style={{'display':'grid', 'grid-template-columns':'auto auto', 'margin':'auto'}}>
                    <div>{score.name}</div>
                    <div>{score.points}</div>
                </div>
            })}        
        </div>
        <Brand />
    </div>)
}