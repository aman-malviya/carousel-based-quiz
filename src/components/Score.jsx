import React from 'react'

export default function Score(){
   return (<div className="d-flex justify-content-center landing-page">
        <div>
            <h3>Your Score</h3>
            <br />
            <div style={{'border':'2px solid rgba(69, 123, 157,0.5)', 'borderRadius':'8px','height':'60px', 'padding':'12px', 'color':'#f1faee'}}><h4 style={{'textAlign':'center'}}>50</h4></div>
        </div>
   </div>)
}