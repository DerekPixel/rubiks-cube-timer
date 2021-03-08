
const TimesTable = ({timesArray = Array, removeTime = Function}) => {

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

  var times = timesArray.map((time, i) => 

    <div
      key={i}
    >
      #{i+1}: {timeToString(time)}
      <button onClick={() => removeTime(time)} >delete</button>
    </div>

  )

  return (
    <div>
      {times}
      <div>avg: {timesArrayAverage()}</div>
      <div>best: {bestTime()}</div>
    </div>
  )
}

export default TimesTable
