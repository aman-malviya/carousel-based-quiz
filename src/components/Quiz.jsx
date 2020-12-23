import {React, useEffect, useState} from 'react';
import Timer from './Timer';
import {db} from '../firebase'
// import {useHistory} from 'react-router-dom'
export default function Quiz() {
  // const history=useHistory();
  const numbers=[1,2,3,4,5,6,7,8];

  // function handleClick(e){
  //   numbers.map(number=>{
  //     document.getElementsByClassName("toggleButton")[number-1].style.backgroundColor="#457B9D";
  //   })
    
  //   e.target.style.backgroundColor="#06d6a0";
  // }
  const [ques,setQues]=useState([]);
  useEffect(()=>{
    db.collection('Questions').onSnapshot(snapshot=>{
      setQues(
        snapshot.docs.map(doc=>({
            que:doc.data().question,
            opta:doc.data().A,
            optb:doc.data().B,
            optc:doc.data().C,
            optd:doc.data().D,
          }))
    )
    })
  }
  
  ,[])


  return (<div className="question_section">
      {/* <p>{ques.
            map(qv=>
            (<div>
                  <p>{qv.que}</p>
                  <p>{qv.opta}</p>
                  <p>{qv.optb}</p>
                  <p>{qv.optc}</p>
                  <p>{qv.optd}</p>



              </div>))}
      </p> */}



      <form id="mainForm" action="/" method="POST">
      <div className="question-container">
        <button style={{'left':'0', 'color':'#E63946'}} className="submit-btn">ABORT</button>
        <div style={{'position':'fixed', 'top':'0'}}>
        <Timer />
        </div>
        <button className="submit-btn">SUBMIT</button>
        <div id="carouselExampleIndicators" className="carousel" data-ride="false" data-interval="false" data-wrap="false">
          <div className="questionToggles">
            {numbers.map(number=>{
                 return (<div style={{'display':'inline-block'}} data-target="#carouselExampleIndicators" data-slide-to={number}>
                      <button className="toggleButton">{number}</button>
                 </div>)
            })}
          </div>  
          <div className="carousel-inner">
              <div className="carousel-item active">
                All the best.
              </div>
              {ques.map((qv,i) =>{
                  return (<div className="carousel-item wow fadeIn" data-wow-duration="0.3s">
                              <div className="question">
                                  <p style={{'margin':'5px 0'}}>{"Question  " +(i+1)} / <span style={{'fontSize':'0.8rem'}}>30</span></p>
                                  <div style={{'height':'0', 'borderTop':'1px dashed rgba(69, 123, 157,0.5)', 'marginBottom':'5px'}}></div>
                                  <p>{ qv.que }</p>
                                  
                              </div>
                              <div className="Answer">
                                  <ul style={{'listStyle':'none','paddingInlineStart':'0'}}>
                                    <li>
                                      <input
                                        // onChange={e=>setAns(e.target.value)}
                                        type="radio"
                                        id={qv.opta}
                                        name={"answer"+(i+1)}
                                        className={"answer"+(i+1)}
                                        value={qv.opta}
                                      />
                                      <label className="option" htmlFor={qv.opta}>
                                      <span>A</span>{qv.opta }
                                      </label>
                                    </li>
                                    <li>
                                      <input
                                        // onChange={e=>setAns(e.target.value)}
                                        type="radio"
                                        id={qv.optb}
                                        name={"answer"+(i+1)}
                                        className={"answer"+(i+1)}
                                        value={qv.optb}
                                      />
                                      <label className="option" htmlFor={qv.optb}>
                                      <span>B</span>{qv.optb }</label>
                                    </li>
                                    <li>
                                      <input
                                        // onChange={e=>setAns(e.target.value)}
                                        type="radio"
                                        id={qv.optc}
                                        name={"answer"+(i+1)}
                                        className={"answer"+(i+1)}
                                        value={qv.optc}
                                      />
                                      <label className="option" htmlFor={qv.optc}>
                                      <span>C</span>{qv.optc}
                                      </label>
                                    </li>
                                    <li>
                                      <input
                                        // onChange={e=>setAns(e.target.value)}
                                        type="radio"
                                        id={qv.optd}
                                        name={"answer"+(i+1)}
                                        className={"answer"+(i+1)}
                                        value={qv.optd}
                                      />
                                      <label className="option" htmlFor={qv.optd}>
                                      <span>D</span>{qv.optd}
                                      </label>
                                    </li>
                                  </ul>
                              </div>
                        </div>)
              })}
          </div>
          <a
            className="carousel-control prev"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="prev"
          ><i className="fas fa-arrow-left"></i> Prev
          </a>
          <a
            className="carousel-control next"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="next"
          >Next <i className="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </form>
  </div>  
  );
}
