import { useState, useEffect, useRef } from 'react'


const Timer = ({updateTimesArray}) => {

  const [display, setDisplay] = useState('00:00:00.00')

  var startTime = 0;

  var isTiming = useRef(false);
  var elapsedTime = useRef(0);
  var timeInterval = useRef(0);

  useEffect(() => {
    document.addEventListener('keyup', startAndStopTimerWithSpaceBar);

    return () => {
      document.removeEventListener('keyup', startAndStopTimerWithSpaceBar);
    }
  })

  const startAndStopTimerWithSpaceBar = (e) => {
    if(e.key === ' ') {
      if(isTiming.current === false) {
        isTiming.current = true;
        start();
      } else if(isTiming.current === true) {
        isTiming.current = false;
        stop();
      }
    }
  }

  const start = () => {
    console.log('start');
    startTime = Date.now();
    timeInterval.current = setInterval(() => {
      elapsedTime.current = Date.now() - startTime;
      setDisplay(timeToString(elapsedTime.current));
    }, 5);
  }

  const stop = () => {
    console.log('stop');
    clearInterval(timeInterval.current);
    updateTimesArray(elapsedTime.current);
    elapsedTime.current = 0;
  }

  const timeToString = (time) => {
    var diffInHr = time / 3600000;
    var hh = Math.floor(diffInHr).toString().padStart(2, "0");
    var diffInMin = (diffInHr - hh) * 60;
    var mm = Math.floor(diffInMin).toString().padStart(2, "0");
    var diffInSec = (diffInMin - mm) * 60;
    var ss = Math.floor(diffInSec).toString().padStart(2, "0");
    var diffInMs = (diffInSec - ss) * 100;
    var ms = Math.floor(diffInMs).toString().padStart(2, "0");
    return `${hh}:${mm}:${ss}.${ms}`;
  }

  return (
    <div>
      {display}
    </div>
  )
}

export default Timer
