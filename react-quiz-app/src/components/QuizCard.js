const QuizCard = ({imgSrc, quizTitle}) => {
  return (
    <div className="quiz-card br-sm">
      <img src={imgSrc} alt={quizTitle} className="img-responsive" />
      <div className="quiz-card-content pd-sm">
        <p className="para-lg pd-bottom-md">{quizTitle}</p>
        <button className="btn btn-primary text-center">Play Quiz</button>
      </div>
    </div>
  );
};

export {QuizCard};
