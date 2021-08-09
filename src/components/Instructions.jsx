import React, {useState} from 'react'
import {LinearProgress} from '@material-ui/core'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import {Redirect} from "react-router-dom"


export default function Instructions(){
    const token=sessionStorage.getItem("auth");
    const submitTime=sessionStorage.getItem("submitTime");
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
    setTimeout(() => {
        setLoading(false);
    }, 3000);

 return(loading?
    <ThemeProvider theme={theme}>
        <LinearProgress />
    </ThemeProvider>    
    :token?submitTime?<Redirect to="/quiz" />:<div style={{'backgroundPositionY':'bottom'}} className="landing-page d-flex justify-content-center">
            <div style={window.innerWidth>700?{'padding':'0 18%'}:{'padding':'0 8%'}} className="question">
                <p style={{'margin':'5px 0','color':'#f1faee','paddingTop':'5%'}}>
                    Instructions for the Quiz-
                </p>
                <div style={{'height':'0', 'borderTop':'1px dashed rgba(69, 123, 157,0.5)', 'marginBottom':'5px'}}>
                </div>
                <p style={{'fontSize':'1rem', 'color':'#f1faee'}}>
                    <ol className="instructions">
                        <li>Read all the instructions carefully before attempting the quiz.</li>
                        <li>Make sure that you have a proper internet connection for the next 30 minutes.</li>
                        <li>The questions will be of Multiple Choice (MCQ) format. The total number of questions is 25 (20 straight + 5 bonus questions).</li>
                        <li>The time remaining will be displayed on the screen.</li>
                        <li>You can easily navigate between the questions.</li>
                        <li>The marking scheme for the quiz is as follows: +4 for each correct response, -1 for each incorrect response and 0 if not attempted.</li>             
                        <li>Bonus section is towards the end of the quiz (Q.21 to Q.25). If you have read the <strong>Untold tales of Independence</strong> featured on QCM's social media handles, it will certainly help you answer this section.</li>
                        <li>Avoid reloading and navigating while attempting the quiz, you may get disqualified and your response may be lost.</li>
                        <li>The score will be displayed on the screen after the completion of the quiz.</li>
                        <li>In case of a tie, the participant taking minimum time for the quiz will be considered the winner.</li>
                    </ol>    
                </p>
                <a style={{'textDecoration':'none', 'marginTop':'20px'}} href="/quiz">
                    <button onClick={()=>
                    sessionStorage.setItem("submitTime", new Date().getTime()+904000)
                    } style={{'borderRadius':'8px', 'width':'250px'}}>
                        Proceed
                    </button>
                </a>
            </div>
        </div>
        :
        <Redirect to="/" />
    )
    
}