import React,{ useEffect, useState }  from 'react'
import './styleTimer.css'
function Timer() {
    const calculateTimeLeft = () => {
        const countdownDate= new Date('December 20, 2020 23:15:00').getTime();
        //curent timer +30 minutes  
        // let year = new Date().getFullYear();
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
      // const [year] = useState(new Date().getFullYear());
    
      useEffect(() => {
        setTimeout(() => {
          setTimeLeft(calculateTimeLeft());
        }, 1000);
      });
    
      const timerComponents = [];
    
      Object.keys(timeLeft).forEach((interval) => {
        if (!timeLeft[interval]) {
          return;
        }
    
        timerComponents.push(
          <span>
            {timeLeft[interval]} {interval}{" "}
          </span>
        );
      });
    
    return (
        <div className="Timer d-flex justify-content-center">
        <div>{timerComponents.length ? timerComponents : <span>Time's up!</span>}</div>
        </div>
    )
}

export default Timer
