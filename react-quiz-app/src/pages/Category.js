import "../styles/category.css";
import {useParams, Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {NavMenu, Footer, QuizCard, Loader} from "../components";

const Category = () => {
  const [loader, setLoader] = useState(true);
  const [quizList, setQuizList] = useState([]);
  const [categoryData, setCategoryData] = useState({});
  const {quizId} = useParams();

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get("/api/quiz");
        setLoader(false);
        const quizDb = response.data.quiz;
        const selectedCategory = quizDb.find(
          (item) => item.id === parseInt(quizId)
        );
        setCategoryData({
          id: selectedCategory.id,
          title: selectedCategory.categoryName,
          cardImg: selectedCategory.categoryImg,
        });
        setQuizList(selectedCategory.allQuiz);
      } catch (err) {
        console.error("Category quiz", err);
      }
    })();
  }, [quizId]);
  return (
    <>
      <NavMenu />
      <section className="app-ctn">
        {loader && <Loader />}
        <h2 className="text-center pd-lg">Quizzes on {categoryData.title}</h2>
        {quizList.length > 0 ? (
          <div className="quiz-card-ctn">
            {quizList.map((item) => (
              <Link
                to={`/rules/${categoryData.id}/${item.quizTitle}`}
                key={item.id}
              >
                <QuizCard
                  imgSrc={categoryData.cardImg}
                  quizTitle={item.quizTitle}
                />
              </Link>
            ))}
          </div>
        ) : (
          <h3 className="text-center">Coming Soon...</h3>
        )}
      </section>
      <Footer />
    </>
  );
};

export {Category};
