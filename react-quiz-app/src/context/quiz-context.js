import {createContext, useContext, useReducer} from "react";
import {quizReducer} from "../reducer/quizReducer";

const QuizContext = createContext(null);

const quizInitialState = {
  totalScore: 0,
  userSelectedOptions: [],
  quizData: [],
  quizBoardData: [],
};

const QuizProvider = ({children}) => {
  const [quizState, quizDispatch] = useReducer(quizReducer, quizInitialState);
  return (
    <QuizContext.Provider value={{quizState, quizDispatch}}>
      {children}
    </QuizContext.Provider>
  );
};

const useQuiz = () => useContext(QuizContext);

export {QuizProvider, useQuiz};
