import './App.css';
import { useState } from 'react'
import Timer from './components/Timer';
import TimesTable from './components/TimesTable';
import Scrambler from './components/Scrambler';

function App() {

  const [timesArray, setTimesArray] = useState([])

  const handleTimesArray = (string) => {
    var timesArrayCopy = timesArray.slice();
    timesArrayCopy.push(string);
    return timesArrayCopy;
  }
  return (
    <div className="App">
      <Scrambler />
      <Timer updateTimesArray={(string) => setTimesArray(handleTimesArray(string))} />
      <TimesTable timesArray={timesArray} />
    </div>
  );
}

export default App;
