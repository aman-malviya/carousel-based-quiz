import {React, useState} from 'react'

export default function Landing(){
    const [text, setText]=useState("");
    const handleChange=(e)=>{
        setText(e.target.value);
    }

    return(<div className='landing-page'>
    <h3>Hello {text} !</h3>
    <div className="d-flex justify-content-center">
    <div>
    <input onChange={handleChange} type="text" placeholder="First Name" />
    <input type="text" placeholder="Last Name" />
    <select>
    <option>Executive</option>
    <option>Quizzer</option>
    <option>Web Developer</option>
    <option>Content Writer</option>
    <option>Photographer</option>
    </select>
    <input type="email" placeholder="Email Address" />
    <input type="tel" placeholder="Mobile Number" />
    <input type="number" placeholder="Scholar Number" />
    </div>
    </div>
    <div className="d-flex justify-content-center"><a href="/verification"><button>Submit</button></a></div>
    <div className="brand">Quizzers' Club<br />
    <span style={{'color':'#E63946', 'fontSize':'1.4rem'}}>MANIT</span>
    </div>
    </div>)
}