import { Link } from "react-router-dom";
import LoginForm from "../components/forms/loginForm";

const Login: React.FC = () => {
  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-6 text-brand">
        Welcome to Qwiz
      </h2>
      <p className="text-gray-600 text-center mb-4">
        Please log in to continue.
      </p>
      <LoginForm />
      <div className="text-center mt-4">
        <Link
          to="/request-reset"
          className="text-sm text-blue-500 hover:underline"
        >
          Forgot Password?
        </Link>
      </div>
      <div className="text-center mt-2">
        <p className="text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </>
  );
};

export default Login;
