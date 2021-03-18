import React from "react"
import SocialMedia from './SocialMedia'

export default function Brand(){
    return <div className="brand">
            E-CELL
            <span style={{'color':'#E63946', 'fontSize':'1.6rem'}}>MANIT</span>
            <br />
            <p style={{'fontSize':window.innerWidth<600?'0.7rem':'1rem', 'marginTop':'10px'}}>© Copyright 2021 All Rights Reserved by <a style={{'color':'#fff'}} href="https://www.linkedin.com/company/quizzers-club-manit/mycompany/">Quizzers' Club MANIT</a>
            <br />
            <a href="https://www.linkedin.com/in/aman-malviya-5347871b1" style={{'color':'#fff'}}>Aman Malviya</a> & <a href="https://www.linkedin.com/in/yash-gupta-aa5656193/" style={{'color':'#fff'}}>Yash Gupta</a></p>
        </div>
}