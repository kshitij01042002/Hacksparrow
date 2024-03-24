// import "../styles/question.css";
// import {useEffect, useState} from "react";
// import {v4 as uuid} from "uuid";
// import {toast} from "react-toastify";
// import {NavMenu, Footer} from "../components";
// import {useQuiz} from "../context/quiz-context";
// import Card from "../components/Card";

// const Result = () => {
//   const [title, setTitle] = useState("")
//   const {quizState} = useQuiz();
//   const isUserCorrect = (index, choice) => {
//     const selectedOption = quizState.userSelectedOptions[index];
//     if (selectedOption === choice.option) {
//       if (!choice.isCorrect) {
//         return "incorrect-option";
//       }
//     }
//   };

//   useEffect(() => {
//     toast.info("Quiz ended");
//     const quizTitle = localStorage.getItem("quizTitle");
//     setTitle(quizTitle)
//     const currentQuizScore = {
//       id: uuid(),
//       title: quizTitle,
//       score: quizState.totalScore,
//     };
//     const prevAllScores = JSON.parse(localStorage.getItem("quizScores"));
//     prevAllScores === null
//       ? localStorage.setItem("quizScores", JSON.stringify([currentQuizScore]))
//       : localStorage.setItem(
//           "quizScores",
//           JSON.stringify([currentQuizScore, ...prevAllScores])
//         );
//   }, [quizState.totalScore]);
//   return (
//     <>
//       <NavMenu />
//       {title=== "Financial Sentiment Ananlysis" ? <div><Card content={cardContent}/></div>:
//       <section>
//         <h2 className="text-center pd-lg">Result</h2>
//         <p className="question-title text-center pd-bottom-lg">
//           {quizState.totalScore >= 60
//             ? "🌟 Congratulations, You Won!"
//             : "😣 Opps, Better Luck Next Time"}
//         </p>
//         <p className="question-title text-center fw-bold">
//           You Scored: {quizState.totalScore}/100
//         </p>
//         <div className="question-ctn">
//           {quizState.quizData.map((item, index) => (
//             <div key={item.id} className="mg-bottom-md pd-bottom-lg">
//               <p className="question-title pd-bottom-lg">{item.question}</p>
//               <div className="option-ctn">
//                 {item.options.map((choice) => (
//                   <p
//                     className={`option result-options ${
//                       choice.isCorrect ? "correct-option" : null
//                     } ${isUserCorrect(
//                       index,
//                       choice
//                     )} pd-sm br-md text-center fw-bold`}
//                     key={choice.option}
//                   >
//                     {choice.option}
//                   </p>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>}
      
//       <Footer />
//     </>
//   );
// };

// export {Result};
import "../styles/question.css";
import {useEffect, useState} from "react";
import {v4 as uuid} from "uuid";
import {toast} from "react-toastify";
import {NavMenu, Footer} from "../components";
import {useQuiz} from "../context/quiz-context";
import Card from "../components/Card";

import axios from "axios";

const Result = () => {
  const [title, setTitle] = useState("")
  const {quizState} = useQuiz();
  const [cardContent, setCardContent] = useState("");//for the result
  const isUserCorrect = (index, choice) => {
    const selectedOption = quizState.userSelectedOptions[index];
    if (selectedOption === choice.option) {
      if (!choice.isCorrect) {
        return "incorrect-option";
      }
    }
  };

  useEffect(() => {
    toast.info("Quiz ended");
    const quizTitle = localStorage.getItem("quizTitle");
    setTitle(quizTitle)
    const currentQuizScore = {
      id: uuid(),
      title: quizTitle,
      score: quizState.totalScore,
    };
    console.log(quizState)
    const prevAllScores = JSON.parse(localStorage.getItem("quizScores"));
    prevAllScores === null
      ? localStorage.setItem("quizScores", JSON.stringify([currentQuizScore]))
      : localStorage.setItem(
          "quizScores",
          JSON.stringify([currentQuizScore, ...prevAllScores])
        );
        setCardContent(quizTitle === "Financial Sentiment Analysis" ? "This is the content for Financial Sentiment Analysis." : "Default card content.");
}, [quizState.totalScore]);
  //}, [quizState.totalScore]);
  return (
    <>
      <NavMenu />
      {title === "Financial Sentiment Analysis" ? <div><Card content={cardContent}/></div> : 
      <section>
      <h2 className="text-center pd-lg">Result</h2>
      <p className="question-title text-center pd-bottom-lg">
        
        {quizState.totalScore >= 60
          ? "🌟 Congratulations, You Won!"
          : "😣 Opps, Better Luck Next Time"}
      </p>
      <p className="question-title text-center fw-bold">
        You Scored: {quizState.totalScore}/100
      </p>
      <div className="question-ctn">
        {quizState.quizData.map((item, index) => (
          <div key={item.id} className="mg-bottom-md pd-bottom-lg">
            <p className="question-title pd-bottom-lg">{item.question}</p>
            <div className="option-ctn">
              {item.options.map((choice) => (
                <p
                  className={`option result-options ${
                    choice.isCorrect ? "correct-option" : null
                  } ${isUserCorrect(
                    index,
                    choice
                  )} pd-sm br-md text-center fw-bold`}
                  key={choice.option}
                >
                  {choice.option}
                </p>
              ))}
            </div>
          </div>
        ))}
      </div>

    </section>
      }
      
      <Footer />
    </>
  );
};

export {Result};