import { Link } from "react-router-dom";
import SignupForm from "../components/forms/signupForm";

const Signup: React.FC = () => {
  return (
    <>
      <h2 className="text-2xl font-bold text-center text-brand">Join Qwiz</h2>
      <p className="text-sm text-gray-500 text-center mb-6 leading-tight">
        Deliver quizzes online, track responses, and make learning fun and
        accessible to more people.
      </p>
      <SignupForm />
      <div className="text-center mt-4">
        <p className="text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Log In
          </Link>
        </p>
      </div>
    </>
  );
};

export default Signup;
