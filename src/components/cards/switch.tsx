import { useState } from "react";

const QuizToggleSwitch: React.FC<{
  onToggle: (isCreatedQuizzes: boolean) => void;
}> = ({ onToggle }) => {
  const [isCreatedQuizzes, setIsCreatedQuizzes] = useState(true);

  const handleAnsweredQuizzes = () => {
    setIsCreatedQuizzes(false);
    onToggle(false);
  };

  const handleCreatedQuizzes = () => {
    setIsCreatedQuizzes(true);
    onToggle(true);
  };

  return (
    <div className="flex items-center space-x-2 rounded-full overflow-auto bg-white shadow-xl">
      <span
        onClick={handleCreatedQuizzes}
        className={`py-2 px-6 rounded-full cursor-pointer ${
          isCreatedQuizzes ? "text-white font-semibold bg-black" : "text-brand"
        }`}
      >
        Quizzes you Created
      </span>
      <span
        onClick={handleAnsweredQuizzes}
        className={`py-2 px-6 rounded-full cursor-pointer ${
          !isCreatedQuizzes ? "text-white font-semibold bg-black" : "text-brand"
        }`}
      >
        Quizzes you Responded
      </span>
    </div>
  );
};

export default QuizToggleSwitch;
