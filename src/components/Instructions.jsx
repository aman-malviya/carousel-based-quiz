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
    :token?submitTime?<Redirect to="/quiz" />:<div className="landing-page d-flex justify-content-center">
            {/*<Prompt
                message={(location, action)=>{
                    if(action==='POP'){
                        sessionStorage.removeItem("auth");
                        return "Are you sure you want to navigate back? You will be taken to the register window and you won't be able to take the test again.";
                    }
                }}
            />*/}
            <div style={window.innerWidth>700?{'padding':'0 25%'}:{'padding':'0 8%'}} className="question">
                <p style={{'margin':'5px 0','color':'#f1faee','paddingTop':'5%'}}>
                    Instructions-
                </p>
                <div style={{'height':'0', 'borderTop':'1px dashed rgba(69, 123, 157,0.5)', 'marginBottom':'5px'}}>
                </div>
                <p style={{'fontSize':'1rem', 'color':'#f1faee'}}>
                    1. Make sure that you have a proper internet connection for the next 30 minutes.
                    <br />
                    <div style={{'height':'0', 'marginBottom':'10px'}}>
                    </div>
                    2. Total number of questions is 60 and all of them are based on General Science.
                    <br />
                    <div style={{'height':'0', 'marginBottom':'10px'}}>
                    </div>
                    3. Total time allotted for the quiz is 30 minutes.
                    <br />
                    <div style={{'height':'0', 'marginBottom':'10px'}}>
                    </div>
                    4. Each question carries 4 marks.
                    <br />
                    <div style={{'height':'0', 'marginBottom':'10px'}}>
                    </div>
                    5. +4 for correct answer, -1 for incorrect answer. Once you answer a question, cannot unanswer it.
                    <br />
                    <div style={{'height':'0', 'marginBottom':'10px'}}>
                    </div>
                    6. Avoid reloading and navigating while attempting the quiz, you may get disqualified and your response may be lost.
                    <br />
                    <div style={{'height':'0', 'marginBottom':'10px'}}>
                    </div>
                    7. Use the question toggles or the Previous and Next Buttons to toggle between questions. Press Submit only when you want to end the quiz.
                </p>
                <a style={{'display':'block', 'textDecoration':'none', 'marginTop':'20px'}} className="d-flex justify-content-center" href="/quiz">
                    <button onClick={()=>
                    sessionStorage.setItem("submitTime", new Date().getTime()+1804000)
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