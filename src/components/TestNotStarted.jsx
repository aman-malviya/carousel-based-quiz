import React from 'react'

export default function TextNotStarted(){
    return(<div style={{'padding':'0 10%'}}>
            <br/>
            <div><h3>You can not enter the Quiz now.</h3></div>
            <div style={{'display':'grid', 'grid-template-columns':'1fr 2fr', 'border':'2px solid rgba(69, 123, 157,0.7)', 'padding':'10px 20px', 'borderRadius':'8px', 'color':'#f1faee'}}>
                <div>E-Summit '21</div>
                <div style={{'textAlign':'right'}}>18th March<br />6 PM to 6:30 PM</div>
            </div>
        </div>)
}