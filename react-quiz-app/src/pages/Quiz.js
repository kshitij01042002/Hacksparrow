import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import {NavMenu, Footer, Question} from "../components";
import {useQuiz} from "../context/quiz-context";
import {QUIZ_ACTIONS} from "../utils/constant";

const Quiz = () => {
  const params = useParams();
  const [quiz, setQuiz] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quizTitle, setQuizTitle] = useState("");
  const {quizDispatch} = useQuiz();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/api/quiz");
        const quizDb = response.data.quiz;
        const selectedQuiz = quizDb.filter(
          (item) => item.id === parseInt(params.quizId)
        );
        const quizQuestions = selectedQuiz[0].allQuiz.find(
          (item) => item.quizTitle === params.quizTitle
        );
        const currentQuiz = quizQuestions;
        setQuizTitle(currentQuiz.quizTitle);
        setQuiz(currentQuiz.quizData);
        quizDispatch({type: QUIZ_ACTIONS.RESET_QUIZ_STATE});
        quizDispatch({
          type: QUIZ_ACTIONS.INITIALIZE_QUIZ_DATA,
          payload: currentQuiz.quizData,
        });
        toast.info("Quiz started");
        localStorage.setItem("quizTitle", params.quizTitle);
      } catch (err) {
        console.error("Single quiz", err);
      }
    })();
  }, [params.quizId, params.quizTitle, quizDispatch]);
  const totalQuestionCount = quiz.length;
  const goToNext = () => {
    currentQuestion < quiz.length - 1 && setCurrentQuestion((n) => n + 1);
  };
  return (
    <>
      <NavMenu />
      <section className="app-ctn">
        <h2 className="text-center pd-lg">{quizTitle}</h2>
        {quiz.length && (
          <Question
            data={quiz[currentQuestion]}
            goToNext={goToNext}
            totalCount={totalQuestionCount}
            currentCount={currentQuestion}
          />
        )}
      </section>
      <Footer />
    </>
  );
};

export {Quiz};
