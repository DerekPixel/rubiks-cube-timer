import React from 'react'

const TimesTable = ({timesArray}) => {

  var times = timesArray.map((time, i) => 
    
    <div
      key={i}
    >
      {time}
    </div>

  )

  return (
    <div>
      {times}
    </div>
  )
}

export default TimesTable
