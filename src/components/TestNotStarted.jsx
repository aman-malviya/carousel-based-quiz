import React from 'react'

export default function TextNotStarted(){
    return(<div style={{'padding':'0 10%'}}>
            <br/>
            <div><h3>You can not enter the Quiz now.</h3></div>
            <div style={{'display':'grid', 'grid-template-columns':'1fr 1fr', 'border':'2px solid rgba(69, 123, 157,0.7)','borderBottom':'none', 'padding':'10px 20px', 'borderRadius':'8px 8px 0 0', 'color':'#f1faee'}}>
                <div>Quiz Begins</div>
                <div style={{'textAlign':'right'}}>16th January 7:00 PM</div>
            </div>
            <div style={{'display':'grid', 'grid-template-columns':'1fr 1fr', 'border':'2px solid rgba(69, 123, 157,0.7)', 'padding':'10px 20px', 'borderRadius':'0 0 8px 8px', 'color':'#f1faee'}}>
                <div>Quiz Ends</div>
                <div style={{'textAlign':'right'}}>16th January 9:00 PM</div>
            </div>
        </div>)
}