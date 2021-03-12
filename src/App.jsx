import './App.css';
import { useState, useEffect } from 'react'
import Timer from './components/Timer';
import TimesTable from './components/TimesTable';
import Scrambler from './components/Scrambler';

function App() {

  //STATES
  const [timesArray, setTimesArray] = useState([]);
  const [inspection, setInspection] = useState(false);
  const [inspectionDuration, setInspectionDuration] = useState(0);

  //FUNCTIONS
  const makeNewlocalStorageObject = () => {
    var Data = []
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
  }, [])

  return (
    <div className="App">

      <header>
        <h1 className='title' >Rubik's Cube Timer</h1>
        
        <Scrambler />
      </header>

      <Timer 
        updateTimesArray={(string) => setTimesArray(addNewTimeToTimesArray(string))} 
        inspection={inspection}
        inspectionDuration={inspectionDuration}
      />

      <div className='timesAndSettings'>
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

    </div>
  );
}

export default App;
