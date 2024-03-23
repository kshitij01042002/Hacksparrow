import {Routes, Route} from "react-router-dom";
import {
  Home,
  Category,
  Quiz,
  Rules,
  Result,
  QuizBoard,
  Login,
  Signup,
  ForgotPassword,
  PageNotFound,
  UserProfile,
} from "../pages";

const MenuRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/category/:quizId" element={<Category />} />
      <Route path="/rules/:quizId/:quizTitle" element={<Rules />} />
      <Route path="/quiz/:quizId/:quizTitle" element={<Quiz />} />
      <Route path="/result" element={<Result />} />
      <Route path="/quizboard" element={<QuizBoard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/user" element={<UserProfile />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export {MenuRoutes};
