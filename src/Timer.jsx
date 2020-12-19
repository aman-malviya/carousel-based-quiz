import {React, useState} from 'react';

export default function Timer(){
    
    let startingMinutes=30;
    let timeDuration=startingMinutes*60;
    let [minutes, setMinutes] = useState();
    let [seconds, setSeconds] = useState();


    function UpdateCountdown(){
        timeDuration--;
        setMinutes(Math.floor(timeDuration/60));
        setSeconds(timeDuration % 60);
    }
    setInterval(UpdateCountdown, 1000);


return(<div>
    {minutes}:{seconds}
    </div>)
}