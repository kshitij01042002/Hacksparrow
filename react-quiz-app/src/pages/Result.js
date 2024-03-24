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
import "./Analysis.css"
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

  const SpendingPatternAnalysis = () => {
    return (
      <div className="analysis-section">
        <h2>Spending Pattern Analysis</h2>
        <p>Your spending pattern indicates a cautious approach to finances. You rarely make impulsive purchases, suggesting a disciplined spending mindset. However, when faced with sales or discounts, you may occasionally consider purchases even if you don't need the items. This suggests some susceptibility to marketing tactics.</p>
        <p>After making a big purchase, you tend to have feelings of guilt or anxiety, indicating that you may be concerned about making unnecessary or extravagant expenses.</p>
        <p>You have a structured approach to major expenses, creating detailed budgets and saving in advance. This demonstrates a responsible financial outlook and an ability to plan for the future.</p>
      </div>
    );
  };
  
  const SentimentalAnalysis = () => {
    return (
      <div className="analysis-section">
        <h2>Sentimental Analysis</h2>
        <p>Your responses suggest a complex emotional relationship with money. On the one hand, you understand the importance of saving and have a budget, indicating a sense of responsibility and financial awareness. On the other hand, you acknowledge that you find it challenging to save consistently and are sometimes influenced by social pressures or emotional appeals.</p>
        <p>This suggests a conflict between your rational understanding of financial principles and your emotional impulses. You may experience moments of guilt or anxiety after making purchases, indicating that you may be struggling to reconcile your spending habits with your values.</p>
        <p>Overall, you appear to be a thoughtful and responsible spender, but there may be areas where you could benefit from seeking professional financial guidance to develop strategies for addressing emotional triggers and improving your savings habits.</p>
      </div>
    );
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
        setCardContent(quizTitle === "Financial Sentiment Analysis" ? 
        <div className="analysis-container">
      <SpendingPatternAnalysis />
      <SentimentalAnalysis />
    </div>
        :
         "Default card content.");
}, [quizState.totalScore]);
  //}, [quizState.totalScore]);
  return (
    <>
      <NavMenu />
      {title === "Financial Sentiment Analysis" ? <div>
      <div className="analysis-container" style={{margin: "24px"}}>
      <SpendingPatternAnalysis />
      <SentimentalAnalysis />
    </div>
      </div> : 
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