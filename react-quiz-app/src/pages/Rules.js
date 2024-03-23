import "../styles/rules.css";
import {NavMenu, Footer} from "../components";
import {Link, useParams} from "react-router-dom";

const Rules = () => {
  const {quizId, quizTitle} = useParams();

  return (
    <>
      <NavMenu />
      <section className="app-ctn">
        <div className="rules-ctn br-md pd-md">
          <Link to={`/quiz/${quizId}/${quizTitle}`} className="btn btn-primary">
            Start Quiz
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
};

export {Rules};
