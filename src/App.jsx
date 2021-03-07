import './App.css';
import React, { useState } from 'react'
import Timer from './components/Timer';
import TimesTable from './components/TimesTable';

function App() {

  const [timesArray, setTimesArray] = useState([])

  const handleTimesArray = (string) => {
    var timesArrayCopy = timesArray.slice();
    timesArrayCopy.push(string);
    return timesArrayCopy;
  }
  return (
    <div className="App">
      <Timer updateTimesArray={(string) => setTimesArray(handleTimesArray(string))} />
      <TimesTable timesArray={timesArray} />
    </div>
  );
}

export default App;
