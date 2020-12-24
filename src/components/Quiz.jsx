import {React, useEffect, useState} from 'react';
import Timer from './Timer';
import {db} from '../firebase'
import {useHistory} from 'react-router-dom'
export default function Quiz() {
  const history=useHistory();
  const numbers=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];

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
 const submitTest=()=>{
    history.push("/score");
 }

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
        <button onClick={submitTest} className="submit-btn">SUBMIT</button>
        <div id="carouselExampleIndicators" className="carousel" data-ride="false" data-interval="false" data-wrap="false">
          <div className="questionToggles">
            {numbers.map(number=>{
                 return (<div style={{'display':'inline-block'}} data-target="#carouselExampleIndicators" data-slide-to={number}>
                      <button className="toggleButton">{number}</button>
                 </div>)
            })}
          </div>  
          <div className="carousel-inner">
              <div style={{'padding':'100px 0', 'fontSize':'1.5rem'}} className="carousel-item active text-center">
                Best of Luck.
                <br />
                <br />
                <br />
                <span data-target="#carouselExampleIndicators" data-slide-to="1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="rgba(69, 123, 157,0.5)" class="bi bi-arrow-right-square" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M14 1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                    <path fill-rule="evenodd" d="M4 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5A.5.5 0 0 0 4 8z"/>
                  </svg>
                </span>
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
