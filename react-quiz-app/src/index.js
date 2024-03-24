import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./server";
import {BrowserRouter as Router} from "react-router-dom";
import {QuizProvider} from "./context/quiz-context";
import 'tachyons';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <QuizProvider>
        <App />
      </QuizProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
