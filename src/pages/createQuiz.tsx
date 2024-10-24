import QuizForm from "../components/forms/newQuizForm";
const CreateQuiz = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-3 text-brand">
        Create Quiz
      </h2>
      <p className="text-gray-600 text-center mb-4">
        Create and share your quiz in minutes
      </p>
      <QuizForm />
    </div>
  );
};

export default CreateQuiz;
