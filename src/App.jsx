import './App.css';
import { useState, useEffect } from 'react'
import Timer from './components/Timer';
import TimesTable from './components/TimesTable';
import Scrambler from './components/Scrambler';

function App() {

  const [timesArray, setTimesArray] = useState([]);
  const [inspection, setInspection] = useState(false);
  const [inspectionDuration, setInspectionDuration] = useState(0);

  const makeNewlocalStorageObject = () => {

    var Data = [
    ]

    return JSON.stringify(Data);
  };

  const returnDataObjectIfExistsOrCreateDataObjectIfNot = () => {
    if(window.localStorage.getItem('user-solve-times') === null) {
      window.localStorage.setItem('user-solve-times', makeNewlocalStorageObject());
    } else {
      return JSON.parse(window.localStorage.getItem('user-solve-times'));
    }

    return JSON.parse(window.localStorage.getItem('user-solve-times'));
  };

  const addNewTimeToTimesArray = (string) => {
    var timesArrayCopy = timesArray.slice();
    timesArrayCopy.push(string);
    window.localStorage.setItem('user-solve-times', JSON.stringify(timesArrayCopy));
    return timesArrayCopy;
  }

  const removeTimeFromTimeArray = (time) => {
    var timesArrayCopy = timesArray.slice();
    var indexToRemove = timesArrayCopy.indexOf(time);
    timesArrayCopy.splice(indexToRemove, 1);
    window.localStorage.setItem('user-solve-times', JSON.stringify(timesArrayCopy));
    return timesArrayCopy;
  }

  const clearAllTimes = () => {
    setTimesArray([]); 
    window.localStorage.setItem('user-solve-times', JSON.stringify([]));
  }

  const switchInspection = () => {
    if(inspection) {
      setInspection(false);
    } else {
      setInspection(true);
    }
  }



  useEffect(() => {
    setTimesArray(returnDataObjectIfExistsOrCreateDataObjectIfNot());
    console.log('hello');
  }, [])

  return (
    <div className="App">
      
      <Scrambler />

      <Timer 
        updateTimesArray={(string) => setTimesArray(addNewTimeToTimesArray(string))} 
        inspection={inspection}
        inspectionDuration={inspectionDuration}
      />

      <TimesTable 
        timesArray={timesArray} 
        removeTime={(time) => setTimesArray(removeTimeFromTimeArray(time))} 
        clearAllTimes={() => clearAllTimes()}
      />

      <input 
        type="checkbox" 
        onClick={() => {switchInspection()}} 
        defaultChecked={inspection} 
      />

      <input 
        type="text" 
        value={
          inspectionDuration === 0 ? '' : inspectionDuration
        } 
        onChange={(event) => setInspectionDuration(event.target.value)} 
        placeholder={
          inspection ? "Time in seconds" : "Inspection is off"
        }
        disabled={!inspection}
      />

    </div>
  );
}

export default App;
