import React, {useState, useEffect} from 'react'
import Brand from './Brand'
import {db} from '../firebase'
import {LinearProgress} from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {useHistory, Redirect} from "react-router-dom"

export default function Score(){
    const [loading, setLoading]=useState(true);
    const theme = createMuiTheme({
        palette: {
            primary: {
                main: "#06d6a0",
            },
            secondary: {
                main: "#f1faee",
            },
        },
    });

    const sch=sessionStorage.getItem("sch");
    const history =useHistory();
    window.addEventListener("popstate", e=>{
        history.push("/");
    })
    //Score Calculation
    const [points, setPoints] =useState(0);
    useEffect(()=>{
        let score=0;
        // db.collection("AnswerBank/"+sessionStorage.getItem("name")+"-"+sessionStorage.getItem("sch")+"/Answers").onSnapshot((snapshot)=>{
        //     snapshot.forEach((doc)=>{
        //             if(doc.data().userAns === ""){
        //                 setPoints(score);
        //             }
        //             if(doc.data().correct ===true){
        //                 score=score+4;
        //                 setPoints(score);
        //             }
        //             if(doc.data().correct === false){
        //                 score=score-1;
        //                 setPoints(score);
        //             }
        //     })
        // })

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
    }).then(()=>{
        setLoading(false);
    })
    return (loading?
        <ThemeProvider theme={theme}>
            <LinearProgress />
        </ThemeProvider>
        :
        sch?<div className="d-flex justify-content-center landing-page">
          <div>
            <h1 style={{'color':'#E63946', 'fontWeight':'bolder', 'textAlign':'center','fontSize':'3rem'}}>
                V<span style={{'fontSize':'2.5rem'}}>I</span>H<span style={{'fontSize':'2.5rem'}}>AA</span>N
            </h1>
            <div className="d-flex justify-content-center">
                <img alt="trophy-img" width="150px" height="150px" src="trophy.png" />
            </div>
            <div style={{'border':'2px solid rgba(69, 123, 157,0.5)', 'borderRadius':'8px','height':'60px', 'width':'200px', 'margin':'auto', 'padding':'12px', 'color':'#f1faee'}}>
                <h4 style={{'textAlign':'center'}}>{points}</h4>
            </div>
            <h6 style={{'color':'#f1faee', 'padding':'20px 50px', 'textAlign':'center'}}        >Thankyou for taking the Test.
                <br />
                <br />
                Team Quizzers' Club MANIT will release the leaderboard soon.<br /><br />Stay tuned.
            </h6> 
            <div className="d-flex justify-content-center">
                <a href="/"><button style={{'borderRadius':'8px', 'width':'250px'}} onClick={()=>{
                    sessionStorage.removeItem("sch");
                    sessionStorage.removeItem("name");
                }}>Go to Landing Page</button></a>
            </div>
        </div>
        <Brand />
   </div>
   :
   <Redirect to="/" />
   )
}