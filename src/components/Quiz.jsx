import {React, useEffect, useState} from 'react';
import Timer from './Timer';
import {db} from '../firebase'
import {useHistory} from 'react-router-dom'
export default function Quiz() {
  const history=useHistory();
  const numbers=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
 
  let [active, setActive] =useState(0);

  const increment=()=>{
    if(active!==30){
      setActive(active+1);
    }
  }
  const decrement=()=>{
    if(active!==0){
      setActive(active-1);
    }
  }

  useEffect(()=>{
    document.querySelectorAll('[data-target="#carouselExampleIndicators"]').forEach((element)=>{
      element.children[0].style.backgroundColor='#457B9D';
    })
    
    let p=document.querySelectorAll('[data-slide-to="'+ (active) +'"]')[0].children[0];
    p.scrollIntoView({inline:'center', top:'-20px'});
    p.style.backgroundColor="#06d6a0";

  },[numbers]);

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
            ans:doc.data().ans,
          }))
    )
    })
  }
  
  ,[])
 const submitTest=()=>{
   numbers.map((number)=>{
      for(let n=0; n<3; n++){
          const input=document.getElementsByName("answer"+(number))[n];
          if(input.checked===true){
            if(ques[number-1].ans===input.value){
              db.collection("AnswerBank/"+sessionStorage.getItem("name")+"-"+sessionStorage.getItem("sch")+"/Answers").doc("answer"+(number<10?"0"+number:number)).set({
              actualAns:ques[number-1].ans,
              userAns: input.value,
              correct:true
            })
            }else{
            db.collection("AnswerBank/"+sessionStorage.getItem("name")+"-"+sessionStorage.getItem("sch")+"/Answers").doc("answer"+(number<10?"0"+number:number)).set({
              actualAns:ques[number-1].ans,
              userAns: input.value,
              correct:false
            })
            }
          }
      }
   })
    history.push("/score");
 }

  return (<div style={{'minHeight':'100vh'}}>
    <div className="grid-container">
          <div style={{'padding':'25px 25px'}} className="grid-item">
             <h3 style={{'color':'#E63946', 'fontWeight':'bolder', 'textAlign':'left'}}>
                V<span style={{'fontSize':'1.2rem'}}>I</span>H<span style={{'fontSize':'1.2rem'}}>AA</span>N
             </h3>
          </div>
          <div className="grid-item" style={{ 'padding':'12px 0', 'color':'#f1faee'}}>
            <div style={{'display':'inline'}} className="d-flex justify-content-center">
              <img alt="timer-img" height="40px" width="40px" src="timer.png" />
            </div>
            <Timer style={{'display':'flex', 'justifyContent':'center'}} />
          </div>
          <div className="grid-item">
            <button onClick={submitTest} className="submit-btn">SUBMIT</button>
          </div>
      </div>
    <div className="question_section">
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

      <form id="mainForm">
      <div className="question-container">
        <div 
             id="carouselExampleIndicators" 
             className="carousel" 
             data-ride="false" 
             data-interval="false" 
             data-wrap="false"
             data-touch="false"
             data-keyboard="false">
                  <div className="questionToggles">
                      <div style={{'display':'inline-block'}} data-target="#carouselExampleIndicators" onClick={()=>{setActive(0)}} data-slide-to="0">
                        <button className="toggleButton"><img alt="thumb-img" src="luck.png" width="27px" height="27px" /></button>
                      </div>
                      {numbers.map(number=>{
                        return (<div style={{'display':'inline-block'}} data-target="#carouselExampleIndicators" onClick={()=>{setActive(number)}} data-slide-to={number}>
                            <button style={window.innerWidth>600?{'margin':'11.2px'}:{}} className="toggleButton">{number}</button>
                        </div>)
                      })}
                  </div>  
          <div className="carousel-inner">
              <div style={{'padding':'100px 0', 'fontSize':'1.3rem'}} className="carousel-item active text-center">
                Best of Luck.
                <br />
                <br />
                <span>
                  <img alt="thumb-img" height="100px" width="100px" src="luck.png" />
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
                                        id={(i+1)+"_a"}
                                        name={"answer"+(i+1)}
                                        className={"answer"+(i+1)}
                                        value="A"
                                      />
                                      <label className="option" htmlFor={(i+1)+"_a"}>
                                      <span>A</span>{qv.opta}
                                      </label>
                                    </li>
                                    <li>
                                      <input
                                        // onChange={e=>setAns(e.target.value)}
                                        type="radio"
                                        id={(i+1)+"_b"}
                                        name={"answer"+(i+1)}
                                        className={"answer"+(i+1)}
                                        value="B"
                                      />
                                      <label className="option" htmlFor={(i+1)+"_b"}>
                                      <span>B</span>{qv.optb }</label>
                                    </li>
                                    <li>
                                      <input
                                        // onChange={e=>setAns(e.target.value)}
                                        type="radio"
                                        id={(i+1)+"_c"}
                                        name={"answer"+(i+1)}
                                        className={"answer"+(i+1)}
                                        value="C"
                                      />
                                      <label className="option" htmlFor={(i+1)+"_c"}>
                                      <span>C</span>{qv.optc}
                                      </label>
                                    </li>
                                    <li>
                                      <input
                                        // onChange={e=>setAns(e.target.value)}
                                        type="radio"
                                        id={(i+1)+"_d"}
                                        name={"answer"+(i+1)}
                                        className={"answer"+(i+1)}
                                        value="D"
                                      />
                                      <label className="option" htmlFor={(i+1)+"_d"}>
                                      <span>D</span>{qv.optd}
                                      </label>
                                    </li>
                                  </ul>
                              </div>
                        </div>)
              })}
          </div>
          <a
            onClick={decrement}
            className="carousel-control prev"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="prev"
          ><i className="fas fa-arrow-left"></i> Prev
          </a>
          <a
            onClick={increment}
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
  </div>  
  );
}
