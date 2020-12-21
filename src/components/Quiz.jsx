import {React, useState} from 'react';
import questions from '../Questions'
import Timer from './Timer';

export default function Quiz() {

  const numbers=[1,2,3,4,5,6,7,8];
   
  // function handleClick(e){
  //   numbers.map(number=>{
  //     document.getElementsByClassName("toggleButton")[number-1].style.backgroundColor="#457B9D";
  //   })
    
  //   e.target.style.backgroundColor="#06d6a0";
  // }

  return (<div className="question_section">
    <form id="mainForm" action="/" method="POST">
      <div class="question-container">
        <button style={{'left':'0', 'color':'#E63946'}} className="submit-btn">ABORT</button>
        <div style={{'position':'fixed', 'top':'0'}}>
        <Timer />
        </div>
        <button className="submit-btn">SUBMIT</button>
        <div id="carouselExampleIndicators" class="carousel" data-ride="false" data-interval="false" data-wrap="false">
          <div className="questionToggles">
            {numbers.map(number=>{
                 return (<div style={{'display':'inline-block'}} data-target="#carouselExampleIndicators" data-slide-to={number}>
                      <button className="toggleButton">{number}</button>
                 </div>)
            })}
          </div>  
          <div class="carousel-inner">
              <div class="carousel-item active">
                All the best.
              </div>
              {questions.map((question,i) =>{
                  return (<div class="carousel-item wow fadeIn" data-wow-duration="0.3s">
                              <div class="question">
                                  <p style={{'margin':'5px 0'}}>{"Question  " +(i+1)} / <span style={{'fontSize':'0.8rem'}}>30</span></p>
                                  <div style={{'height':'0', 'borderTop':'1px dashed rgba(69, 123, 157,0.5)', 'marginBottom':'5px'}}></div>
                                  <p>{ question.question }</p>
                              </div>
                              <div class="Answer">
                                  <ul style={{'listStyle':'none','padding-inline-start':'0'}}>
                                    <li><div class="form-group">
                                      <input
                                        type="radio"
                                        id={question.option1}
                                        name={"answer"+(i+1)}
                                        class={"answer"+(i+1)}
                                        value={question.option1}
                                      />
                                      <label class="option" for={question.option1}>
                                      <span>A</span>{question.option1 }
                                      </label>
                                      </div>
                                    </li>
                                    <li><div class="form-group">
                                      <input
                                        type="radio"
                                        id={question.option2}
                                        name={"answer"+(i+1)}
                                        class={"answer"+(i+1)}
                                        value={question.option2}
                                      />
                                      <label class="option" for={question.option2}>
                                      <span>B</span>{question.option2 }</label>
                                      </div>
                                    </li>
                                    <li><div class="form-group">
                                      <input
                                        type="radio"
                                        id={question.option3}
                                        name={"answer"+(i+1)}
                                        class={"answer"+(i+1)}
                                        value={question.option3}
                                      />
                                      <label class="option" for={question.option3}>
                                      <span>C</span>{question.option3}
                                      </label>
                                      </div>
                                    </li>
                                    <li><div class="form-group">
                                      <input
                                        type="radio"
                                        id={question.option4}
                                        name={"answer"+(i+1)}
                                        class={"answer"+(i+1)}
                                        value={question.option4}
                                      />
                                      <label class="option" for={question.option4}>
                                      <span>D</span>{question.option4}
                                      </label>
                                      </div>
                                    </li>
                                  </ul>
                              </div>
                        </div>)
              })}
          </div>
          <a
            class="carousel-control prev"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="prev"
          ><i class="fas fa-arrow-left"></i> Prev
          </a>
          <a
            class="carousel-control next"
            href="#carouselExampleIndicators"
            role="button"
            data-slide="next"
          >Next <i class="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </form>
  </div>  
  );
}
