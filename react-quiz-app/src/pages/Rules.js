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
          <h2>Rules</h2>
          <div className="rules-info">
            <ul>
              <li>
                <span class="material-icons">chevron_right</span>
                Each question consist of 20 points
              </li>
              <li>
                <span class="material-icons">chevron_right</span>
                To pass the test you need to score atleast 60%
              </li>
              <li>
                <span class="material-icons">chevron_right</span>
                There is only one right answer to each question
              </li>
            </ul>
          </div>
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
