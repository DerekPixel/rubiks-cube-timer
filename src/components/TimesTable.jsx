
const TimesTable = ({timesArray = Array, removeTime = Function, clearAllTimes = Function}) => {

  const timeToString = (time) => {
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

  const timesArrayAverage = () => {
    if(timesArray.length === 0) return;

    var avg = 0;
    for(var i = 0; i < timesArray.length; i++) {
      avg+= timesArray[i];
    }
    return timeToString(avg/timesArray.length);
  }

  const bestTime = () => {
    if(timesArray.length === 0) return;
    return timeToString(Math.min(...timesArray));
  }

  const worstTime = () => {
    if(timesArray.length === 0) return;
    return timeToString(Math.max(...timesArray));
  }

  var times = timesArray.map((time, i) => 

    <div
      className={
        timeToString(time) === bestTime() ? 
          'times bestTime' : 
        timeToString(time) === worstTime() ? 
          'times worstTime' : 
        'times'
      }
      key={i}
    >
      {i+1}: {timeToString(time)}
      <button className='deleteButton' onClick={() => removeTime(time)} >X</button>
    </div>

  )

  return (
    <div>
      <button 
        className='clearAll'
        onClick={() => clearAllTimes()} 
      >
        Clear All Times
      </button>

      <div className='timesTable' >
        {times}
      </div>

      <div className="stats">
        <div>Avg: {timesArrayAverage() ? timesArrayAverage() : '00:00.00'}</div>
        <div className='bestTime' >Best: {bestTime() ? bestTime() : '00:00.00'}</div>
      </div>
    </div>
  )
}

export default TimesTable
