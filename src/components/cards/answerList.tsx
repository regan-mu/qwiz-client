import { Answer } from "../../types";

interface AnswerListProps {
  answers: Answer[];
  onAnswerChange: (answerId: number) => void;
}

const AnswerList: React.FC<AnswerListProps> = ({ answers, onAnswerChange }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-semibold font-manrope mb-2">Answers:</label>
      {answers.map((answer) => (
        <div key={answer.id} className="flex items-center mb-2">
          <input
            type="radio"
            name="correctAnswer"
            checked={answer.isCorrect}
            onChange={() => onAnswerChange(answer.id)}
            className="mr-2 scale-125"
          />
          <span className={`${answer.isCorrect ? "text-green-600" : "text-gray-700"}`}>
            {answer.answer_text}
          </span>
        </div>
      ))}
    </div>
  );
};

export default AnswerList;
