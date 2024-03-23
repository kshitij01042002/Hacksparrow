import "../styles/quizboard.css";
import {useEffect, useState} from "react";
import { NavMenu, Footer } from "../components";

const QuizBoard = () => {
    const [allQuizScores, setAllQuizScores] = useState([]);

    useEffect(() => {
        const scoreData = JSON.parse(localStorage.getItem("quizScores"));
        setAllQuizScores(scoreData);
    }, []);
    
    return (
        <>
        <NavMenu />
        <section className="app-ctn">
            <h2 className="text-center pd-lg">Quiz Board</h2>
            {allQuizScores !== null ? 
            <div className="quiz-board-ctn">
                {allQuizScores.map(item => (
                    <div key={item.id} className="score-ctn pd-md br-md mg-bottom-md">
                    <p className="para-lg">{item.title}</p>
                    <p className="para-lg fw-bold">{item.score}</p>
                </div>
                ))}
            </div> : <h3 className="text-center">Your quiz board is empty</h3>}
        </section>
        <Footer />
        </>
    );
}

export {QuizBoard};