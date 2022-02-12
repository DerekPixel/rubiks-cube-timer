import React from 'react';

function Settings({
  switchInspection,
  inspection, 
  inspectionDuration, 
  setInspectionDuration
}) {
  return (
  <div className="settings">
    <div className='inspectionSwitch'>
      <label htmlFor="checkbox">Inspection On/Off</label>
      <input
        type="checkbox"
        name='checkbox'
        onClick={switchInspection}
        defaultChecked={inspection}
      />
    </div>
    <div>
      <input
        type="text"
        name='duration'
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
  )
}

export default Settings