import "../styles/question.css";
import {useNavigate} from "react-router-dom";
import {useQuiz} from "../context/quiz-context";
import {QUIZ_ACTIONS} from "../utils/constant";
import {useTimer} from "../hooks";

const Question = ({data, goToNext, totalCount, currentCount}) => {
  const {quizDispatch} = useQuiz();
  const navigate = useNavigate();
  const {minutes, setMinutes, seconds, setSeconds} = useTimer(
    goToNext,
    currentCount,
    totalCount
  );

  const handleQuestionCount = (item) => {
    goToNext();
    setMinutes(2);
    setSeconds(0);
    quizDispatch({
      type: QUIZ_ACTIONS.SET_USER_SELECTED_OPTION,
      payload: item.option,
    });
    if (item.isCorrect) {
      quizDispatch({type: QUIZ_ACTIONS.INCREASE_SCORE});
    }
    if (currentCount === totalCount - 1) {
      navigate("/result");
    }
  };

  const handleQuitQuiz = () => {
    quizDispatch({type: QUIZ_ACTIONS.RESET_QUIZ_STATE});
    navigate("/");
  };
  return (
    <div className="question-ctn">
      <div className="question-head pd-bottom-lg">
        <p className="fw-bold">
          Question: {currentCount + 1}/{totalCount}
        </p>
        <h3>
          {minutes < 10 ? `0${minutes}` : minutes} :
          {seconds < 10 ? `0${seconds}` : seconds}
        </h3>
        <button className="btn btn-primary" onClick={handleQuitQuiz}>
          Quit
        </button>
      </div>

      <p className="question-title pd-bottom-lg">{data.question}</p>
      <div className="option-ctn">
        {data.options.map((item) => (
          <p
            className="option pd-sm br-md text-center fw-bold"
            onClick={() => handleQuestionCount(item)}
            key={item.option}
          >
            {item.option}
          </p>
        ))}
      </div>
    </div>
  );
};

export {Question};
