import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import LandingPage from "./pages/landing";
import Login from "./pages/login";
import Signup from "./pages/signup";
import AuthLayout from "./layouts/authLayout";
import RequestPasswordReset from "./pages/requestPasswordReset";
import PageNotFound from "./pages/404";
import ProtectedRoutes from "./components/auth/protectedRoutes";
import AccountPage from "./pages/userAccount";
import Logout from "./pages/logout";
import QuizProfile from "./pages/quizProfile";
import AccountLayout from "./layouts/accountLayout";
import CreateQuiz from "./pages/createQuiz";
import QuizQuestionCreator from "./pages/quizQuestions";
import QuestionProfile from "./pages/question";
import EditQuiz from "./pages/editQuiz";
import QuizAnsweringPage from "./pages/quizResponse";
import UserProfile from "./pages/profile";

function App() {
  return (
    <BrowserRouter>
      <main className="font-jost">
        <ToastContainer />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/logout" element={<Logout />} />
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/request-reset" element={<RequestPasswordReset />} />
          </Route>
          <Route element={<AccountLayout />}>
            <Route
              path="/account/:id"
              element={
                <ProtectedRoutes>
                  <AccountPage />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/profile/:id"
              element={
                <ProtectedRoutes>
                  <UserProfile />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/quiz/:id"
              element={
                <ProtectedRoutes>
                  <QuizProfile />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/quiz/:id/edit"
              element={
                <ProtectedRoutes>
                  <EditQuiz />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/quiz/:id/respond"
              element={
                <ProtectedRoutes>
                  <QuizAnsweringPage />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/new-quiz"
              element={
                <ProtectedRoutes>
                  <CreateQuiz />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/quiz/:id/questions"
              element={
                <ProtectedRoutes>
                  <QuizQuestionCreator />
                </ProtectedRoutes>
              }
            />
            <Route
              path="/question/:id"
              element={
                <ProtectedRoutes>
                  <QuestionProfile />
                </ProtectedRoutes>
              }
            />
          </Route>
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
