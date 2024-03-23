import {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";

const useTimer = (goToNext, currentCount, totalCount) => {
    const [minutes, setMinutes] = useState(2);
    const [seconds, setSeconds] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
      function handleCountDown() {
        if (seconds > 0) {
          setSeconds((prev) => prev - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            setMinutes(2);
            goToNext();
            if (currentCount === totalCount - 1) {
                navigate("/result");
            }
          } else {
            setMinutes((prev) => prev - 1);
            setSeconds(59);
          }
        }
      }
      let intervalId = setInterval(handleCountDown, 1000);
      return () => {
        clearInterval(intervalId);
      };
    }, [minutes, seconds, goToNext, currentCount, totalCount, navigate]);

    return {minutes, setMinutes, seconds, setSeconds}
}

export {useTimer};