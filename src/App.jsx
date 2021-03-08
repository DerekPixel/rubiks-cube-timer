import './App.css';
import { useState } from 'react'
import Timer from './components/Timer';
import TimesTable from './components/TimesTable';
import Scrambler from './components/Scrambler';

function App() {

  const [timesArray, setTimesArray] = useState([]);
  const [inspection, setInspection] = useState(true);

  const addNewTimeToTimesArray = (string) => {
    var timesArrayCopy = timesArray.slice();
    timesArrayCopy.push(string);
    return timesArrayCopy;
  }

  const removeTimeFromTimeArray = (time) => {
    var timesArrayCopy = timesArray.slice();
    var indexToRemove = timesArrayCopy.indexOf(time);
    timesArrayCopy.splice(indexToRemove, 1);
    return timesArrayCopy;
  }

  const switchInspection = () => {
    if(inspection) {
      setInspection(false);
    } else {
      setInspection(true);
    }
  }



  return (
    <div className="App">
      <Scrambler />
      <Timer 
        updateTimesArray={(string) => setTimesArray(addNewTimeToTimesArray(string))} 
        inspection={inspection}
      />
      <TimesTable 
        timesArray={timesArray} 
        removeTime={(time) => setTimesArray(removeTimeFromTimeArray(time))} 
      />
      <button
        onClick={() => switchInspection()}
      >
        {
          inspection ? 'Inspection is on' : 'Inspection is off'
        }
      </button>
    </div>
  );
}

export default App;
