import './App.css';
import { useState, useEffect } from 'react'
import Timer from './components/Timer.jsx';
import TimesTable from './components/TimesTable.jsx';
import Scrambler from './components/Scrambler.jsx';
import Settings from './components/TimesAndSettings.jsx';

function App() {

  //STATES
  const [timesArray, setTimesArray] = useState([]);
  const [inspection, setInspection] = useState(false);
  const [inspectionDuration, setInspectionDuration] = useState(0);

  //FUNCTIONS
  function makeNewlocalStorageObject() {
    var Data = []
    return JSON.stringify(Data);
  };

  function returnDataObjectIfExistsOrCreateDataObjectIfNot() {
    if(window.localStorage.getItem('user-solve-times') === null) {
      window.localStorage.setItem('user-solve-times', makeNewlocalStorageObject());
    } else {
      return JSON.parse(window.localStorage.getItem('user-solve-times'));
    }
    return JSON.parse(window.localStorage.getItem('user-solve-times'));
  };

  function addNewTimeToTimesArray(string) {
    var timesArrayCopy = timesArray.slice();
    timesArrayCopy.push(string);
    window.localStorage.setItem('user-solve-times', JSON.stringify(timesArrayCopy));
    return timesArrayCopy;
  }

  function removeTimeFromTimeArray(time) {
    var timesArrayCopy = timesArray.slice();
    var indexToRemove = timesArrayCopy.indexOf(time);
    timesArrayCopy.splice(indexToRemove, 1);
    window.localStorage.setItem('user-solve-times', JSON.stringify(timesArrayCopy));
    return timesArrayCopy;
  }

  function clearAllTimes() {
    setTimesArray([]); 
    window.localStorage.setItem('user-solve-times', JSON.stringify([]));
  }

  function switchInspection() {
    if(inspection) {
      setInspection(false);
    } else {
      setInspection(true);
    }
  }

  function handleDeletingTimes(time) {
    setTimesArray(removeTimeFromTimeArray(time))
  }

  useEffect(() => {
    setTimesArray(returnDataObjectIfExistsOrCreateDataObjectIfNot());
    // eslint-disable-next-line
  }, [])

  return (
    <div className="App">

      <header>
        <h1 className='title' >Rubik's Cube Timer</h1>
      </header>

      <div className="twoColumns">
        <div className='leftColumn' >
          <div className="scrambler-and-timer">
            <Scrambler />
            
            <Timer
              updateTimesArray={(string) => setTimesArray(addNewTimeToTimesArray(string))}
              inspection={inspection}
              inspectionDuration={inspectionDuration}
            />
          </div>
        </div>
        <div className="rightColumn">
          <div className='timesAndSettings'>
            <TimesTable
              timesArray={timesArray}
              removeTime={handleDeletingTimes}
              clearAllTimes={clearAllTimes}
            />
            <Settings
              switchInspection={switchInspection}
              inspection={inspection}
              inspectionDuration={inspectionDuration}
              setInspectionDuration={setInspectionDuration}
            />
          </div>
        </div>
      </div>

      <footer>
        <p className='footerItem'>Made by Derek Price</p>
        <a className='footerItem' href="https://github.com/DerekPixel/rubiks-cube-timer">GitHub</a>
      </footer>

    </div>
  );
}

export default App;
