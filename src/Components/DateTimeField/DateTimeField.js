// import React from 'react'

import {useState, useEffect} from 'react';


const DateTimeField = ({setTargetDateTime}) => {

    const [ minDateTime, setminDateTime ] = useState('');
    const [ dateTime, setDateTime ] = useState('');

    const inputStyle = {
        "cursor" : "pointer"
    };

    const setMinDate = () => {
        const date = new Date();
        const currentDate = date.toISOString().slice(0, -8);
        setminDateTime(currentDate);
    }

    const handleDateTimeChange = (e) => {
        // console.log(e.target.value);
        setDateTime( e.target.value );
        setTargetDateTime( e.target.value );
    }

    useEffect(()=> {

        setMinDate();

    }, []);
  return (
    <input 
    id = "datetime-filed"
    type="datetime-local"
    onChange={(e) => handleDateTimeChange(e)}
    min={minDateTime}
    value={dateTime}
    style={inputStyle}

    />
  )
}

export default DateTimeField