import React, {useEffect} from 'react'
import {auth} from '../firebase'
import {useHistory} from 'react-router-dom'

export default function Instructions(){
const history=useHistory();
 return(<div className="landing-page d-flex justify-content-center">
            <div style={window.innerWidth>700?{'padding':'0 25%'}:{'padding':'0 8%'}} className="question">
                <p style={{'margin':'5px 0','color':'#f1faee','paddingTop':'5%'}}>
                    Instructions-
                </p>
                <div style={{'height':'0', 'borderTop':'1px dashed rgba(69, 123, 157,0.5)', 'marginBottom':'5px'}}>
                </div>
                <p style={{'fontSize':'1rem', 'color':'#f1faee'}}>
                    1. Total time allotted to solve the paper is 30 mins.The total number of questions is 30.
                    <br />
                    <div style={{'height':'0', 'marginBottom':'10px'}}>
                    </div>
                    2. Questions are divided into 2 sections, Aptitude and General Knowledge. Each section has 15 questions.
                    <br />
                    <div style={{'height':'0', 'marginBottom':'10px'}}>
                    </div>
                    3. Any of the section can be attempted first, and the student can jump in between sections.
                    <br />
                    <div style={{'height':'0', 'marginBottom':'10px'}}>
                    </div>
                    4. Each question carries 3 marks with no negative marks.
                    <br />
                    <div style={{'height':'0', 'marginBottom':'10px'}}>
                    </div>
                    5. Some questions with ** beside them are considered a bonus question and carry 4 marks for a right answer and -1 for a wrong answer.
                    <br />
                    <div style={{'height':'0', 'marginBottom':'10px'}}>
                    </div>
                    6. Attempting the quiz twice leads to disqualification.
                </p>
                <a style={{'display':'block', 'textDecoration':'none', 'marginTop':'20px'}} className="d-flex justify-content-center" href="/quiz">
                    <button style={{'borderRadius':'8px', 'width':'250px'}}>
                        Proceed
                    </button>
                </a>
            </div>
        </div>
    )
}