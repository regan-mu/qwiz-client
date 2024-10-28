import { QuestionResponse } from "../../types";

interface QuestionComponentProps {
  question: QuestionResponse;
  onAnswerSelect: (questionId: number, answerId: number) => void;
}

const QuestionComponent: React.FC<QuestionComponentProps> = ({
  question,
  onAnswerSelect,
}) => {
  return (
    <div className="p-4">
      <h2 className="text-lg font-manrope font-medium mb-4">
        <span
          dangerouslySetInnerHTML={{
            __html: question.question_text.trim(),
          }}
        />
      </h2>
      <form>
        {question.answers.map((answer) => (
          <div key={answer.id} className="mb-2">
            <label className="flex items-center text-sm">
              <input
                type="radio"
                name={`question_${question.id}`}
                value={answer.id}
                onChange={() => onAnswerSelect(question.id, answer.id)}
                className="mr-2 scale-125"
              />
              {answer.answer_text}
            </label>
          </div>
        ))}
      </form>
    </div>
  );
};

export default QuestionComponent;
