import { useState, useEffect } from "react";
import { CountDownCard } from "../Components/CountDown/CountDownCard";
import Completed from "../Components/CountDownCompleted/Completed";
import DateTimeField from "../Components/DateTimeField/DateTimeField";
import "./HomePage.css";

const HomePage = () => {
  const [targetDateTime, setTargetDateTime] = useState("");
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [timerId, setTimerId] = useState(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectHundredDays, setSelectHundredDays ] = useState(false);

  const startCounter = () => {
    if (!targetDateTime ) {
      return;
    }

    if ( selectHundredDays ) {
        return;
    }

    // if ( isCompleted ) {
    //     setIsCompleted(false);
    // }

    clearInterval(timerId); 
    const timer = setInterval(() => {
      counting();
    }, 1000);

    setTimerId(timer);
  };

  const counting = () => {
    const currentDateTime = new Date();
    const target = new Date(targetDateTime);
    const timeDiff = target - currentDateTime;

    if (timeDiff <= 0) {
      clearInterval(timerId);
      setTimeRemaining({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
      });
      return;
    }


    const remainingSeconds = Math.floor(timeDiff / 1000);


    if (remainingSeconds <= 0) {
      setIsCompleted(true);
      cancelCountDown();
    }


    const days = Math.floor(remainingSeconds / (24 * 60 * 60));
    const hours = Math.floor((remainingSeconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((remainingSeconds % (60 * 60)) / 60);
    const seconds = remainingSeconds % 60;

    setTimeRemaining({
      days,
      hours,
      minutes,
      seconds,
    });
  };

  const handleSetDateTime = (datetime) => {
    setTargetDateTime(datetime);
    setIsCompleted(false);

    check100Days(datetime);
  };

  const cancelCountDown = () => {
    clearInterval(timerId);
    setTimerId(null);
    setTimeRemaining({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  };

  const check100Days = (target) => {
    const selectedDateTime = new Date(target);
    const currentDateTime = new Date();

    // Calculate the difference in milliseconds
    const timeDiff = selectedDateTime - currentDateTime;

    // Calculate the difference in days
    const diffInDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (diffInDays > 100) {
        setSelectHundredDays(true);
    } else {
        // Proceed with setting the target date
        setSelectHundredDays(false);
    }
  }


  return (
    <div className="container">
      <h2>
        <span>CountDown </span>
        <span>Timer </span>
      </h2>

      <div className="section">
        <DateTimeField setTargetDateTime={handleSetDateTime} />
      </div>

      <div className="section">
        <button
          onClick={timerId ? cancelCountDown : startCounter}
          id="start-countdown"
        >
          {timerId ? "Cancel Timer" : "Start Countdown"}
        </button>
      </div>

      <div className="section count-section">
        {isCompleted ? (
          <Completed />
        ) : (
            (selectHundredDays) ? <div>Selected time is more than 100 Days</div> : (
                Object.keys(timeRemaining).map((key) => (
                    <CountDownCard key={key} count={timeRemaining[key]} text={key} />
                  ))
            )
       
        )}
      </div>
    </div>
  );
};

export default HomePage;
