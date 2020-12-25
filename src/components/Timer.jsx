import React,{ useEffect, useState }  from 'react'
import './styleTimer.css'
function Timer() {
    const calculateTimeLeft = () => {
        const countdownDate= new Date('December 30, 2020 16:16:00').getTime();
        const difference = countdownDate - +new Date();
        let timeLeft = {};
    
        if (difference > 0) {
          timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
          };
        }
    
        return timeLeft;
      };

      const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
    
      useEffect(() => {
        setTimeout(() => {
          setTimeLeft(calculateTimeLeft());
        }, 1000);
      });
      // if(timeLeft.minutes <9){
      //   timeLeft.minutes = "0"+timeLeft.minutes;
      // }
      // if(timeLeft.seconds <9){
      //   timeLeft.seconds = "0"+timeLeft.seconds;
      // }
    return (
        <div className="Timer d-flex justify-content-center">
        <div style={{'fontWeight':'bold'}}>
          <p style={{'textAlign':'center', 'margin':'0', 'padding':'0'}}>
            {timeLeft.minutes?(timeLeft.minutes<=9?"0"+timeLeft.minutes:timeLeft.minutes):"00"}
            : 
            {timeLeft.seconds?(timeLeft.seconds<=9?"0"+timeLeft.seconds:timeLeft.seconds):"00"}
          </p>        
        </div>
        </div>
    )
}

export default Timer
