import { useState, useEffect, useRef } from 'react'

const Timer = ({updateTimesArray, inspection = Boolean, inspectionDuration}) => {

  const [display, setDisplay] = useState('00:00.00');

  var startTime = 0;

  var isTiming = useRef(false);
  var isInspection = useRef(false);
  var elapsedTime = useRef(0);
  var timeInterval = useRef(0);
  var inspectionTimeInterval = useRef(0);

  useEffect(() => {
    document.addEventListener('keyup', startAndStopTimerWithSpaceBar);

    return () => {
      document.removeEventListener('keyup', startAndStopTimerWithSpaceBar);
    }
  })

  function startAndStopTimerWithSpaceBar(e) {
    if(inspection) {
      
      if(e.key === ' ') {
        if(isTiming.current === false) {
          if(isInspection.current === false) {
            isInspection.current = true
            var inspectionTime = (inspectionDuration*1000);
            var newStartTime = Date.now();
            inspectionTimeInterval.current = setInterval(() => {
              inspectionTime -= (Date.now() - newStartTime);
              if(inspectionTime <= 0) {
                clearInterval(inspectionTimeInterval.current);
                isTiming.current = true;
                start();
              } else {
                newStartTime = Date.now();
                setDisplay(timeToString(inspectionTime));
              }
            }, 5);
          } else if(isInspection.current === true) {
            isInspection.current = false
            clearInterval(inspectionTimeInterval.current);
            setDisplay('00:00.00');
          }
        } else if(isTiming.current === true) {
          isTiming.current = false;
          isInspection.current = false
          stop();
        }
      }

    } else {
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
  }

  function start() {
    console.log('start');
    startTime = Date.now();
    timeInterval.current = setInterval(() => {
      elapsedTime.current = Date.now() - startTime;
      setDisplay(timeToString(elapsedTime.current));
    }, 5);
  }

  function stop() {
    console.log('stop');
    clearInterval(timeInterval.current);
    updateTimesArray(elapsedTime.current);
    elapsedTime.current = 0;
  }

  function timeToString(time) {
    var diffInHr = time / 3600000;
    var hh = Math.floor(diffInHr).toString().padStart(2, "0");
    var diffInMin = (diffInHr - hh) * 60;
    var mm = Math.floor(diffInMin).toString().padStart(2, "0");
    var diffInSec = (diffInMin - mm) * 60;
    var ss = Math.floor(diffInSec).toString().padStart(2, "0");
    var diffInMs = (diffInSec - ss) * 100;
    var ms = Math.floor(diffInMs).toString().padStart(2, "0");
    return `${mm}:${ss}.${ms}`;
  }

  return (
    <div>
      <div className='timer' >
        {display}
      </div>
      <p>Press the <em>spacebar</em> to start/stop the timer.</p>
    </div>
  )
}

export default Timer
