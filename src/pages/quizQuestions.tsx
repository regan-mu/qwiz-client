import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { v4 } from "uuid";
import { toast } from "react-toastify";
import { AiOutlineClose } from "react-icons/ai";
import { Question, Choice } from "../types";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { addQuizAnswers, fetchQuizQuestions } from "../APIRequests/requests";
import QuestionField from "../components/cards/questionRichInput";

const QuizQuestionCreator: React.FC = () => {
  const [questionText, setQuestionText] = useState("");
  const [choices, setChoices] = useState<Choice[]>([]);
  const [newChoiceText, setNewChoiceText] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["quizQuestions"],
    queryFn: async () => await fetchQuizQuestions(axiosPrivate, id!),
  });

  const handleSetQuestionText = (value: string) => {
    setQuestionText(value);
  };

  // Add questions
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["create_questions"],
    mutationFn: async (data: Question) =>
      await addQuizAnswers(data, axiosPrivate, id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quizQuestions"] });
    },
  });

  const handleAddChoice = () => {
    if (newChoiceText.trim() !== "") {
      setChoices([
        ...choices,
        { answer_text: newChoiceText, isCorrect: false },
      ]);
      setNewChoiceText("");
    }
  };

  const removeChoice = (indexToRemove: number) => {
    if (indexToRemove > -1 && indexToRemove < choices.length) {
      setChoices((prev) => prev.filter((_, index) => index !== indexToRemove));
    }
  };

  const handleMarkCorrect = (index: number) => {
    setChoices((prevChoices) =>
      prevChoices.map((choice, i) => ({
        ...choice,
        isCorrect: i === index,
      }))
    );
  };

  const handleSubmit = async () => {
    const newQuestion: Question = {
      question_text: questionText,
      answers: choices,
      quizId: Number(id),
    };
    // Check if there is a correct answer marked. If not raise an error.
    const correctAnswer = choices.filter((choice) => choice.isCorrect);
    if (!questionText) {
      toast.error("Question Not added");
      return;
    }
    if (choices.length === 1) {
      toast.error("Only one Answer choice provided");
      return;
    }
    if (correctAnswer.length === 0) {
      toast.error("Correct answer was not marked");
      return;
    }
    await mutateAsync(newQuestion);
    // Clear form after submission
    setQuestionText("");
    setChoices([]);
  };

  return (
    <div className="flex gap-5">
      <div className="max-w-xl w-full p-6 bg-white rounded shadow-md h-max">
        <h2 className="text-2xl mb-4">Create Quiz Question</h2>

        {/* Question Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Question
          </label>
          <QuestionField
            placeholder="Type question here..."
            question={questionText}
            handleQuestionText={handleSetQuestionText}
          />
        </div>

        {/* Add Choice Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Add Answer Choice
          </label>
          <div className="flex gap-1">
            <input
              type="text"
              value={newChoiceText}
              onChange={(e) => setNewChoiceText(e.target.value)}
              placeholder="Enter answer choice"
              className="flex-grow px-4 py-2 border rounded focus:outline-none focus:ring-1 focus:ring-brand"
            />
            <button
              onClick={handleAddChoice}
              className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-opacity-80 transition"
            >
              Add
            </button>
          </div>
        </div>

        {/* List of Choices */}
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2">Choices</h3>
          {choices.length === 0 ? (
            <p className="text-gray-500">No choices added yet.</p>
          ) : (
            <ul className="space-y-2">
              {choices.map((choice, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 relative border p-1 rounded-md"
                >
                  <input
                    type="radio"
                    name="correctChoice"
                    checked={choice.isCorrect}
                    onChange={() => handleMarkCorrect(index)}
                  />
                  <span>{choice.answer_text}</span>
                  <AiOutlineClose
                    onClick={() => removeChoice(index)}
                    className="absolute right-1 cursor-pointer w-5 h-5 text-red-500 bg-gray-300 rounded-sm p-[3px] hover:scale-105 transition"
                  />
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Submit Button */}
        <button
          disabled={isPending}
          onClick={handleSubmit}
          className="w-full px-4 py-2 bg-brand text-white rounded disabled:opacity-60 disabled:cursor-not-allowed hover:bg-opacity-80 transition"
        >
          Save Question
        </button>
      </div>
      <div className="w-full h-max border p-5 rounded-lg shadow-md bg-white">
        <h2 className="text-brand text-xl mb-10">{data?.quiz}</h2>
        <h2 className="font-medium mb-3">Questions for this Quiz</h2>
        {data?.questions && data?.questions?.length > 0 ? (
          <ol className="font-light list-decimal pl-5">
            {data?.questions?.map((qn) => (
              <li className="hover:text-brand transition mb-2" key={v4()}>
                <Link to={`/question/${qn.id}`}>
                  <span
                    dangerouslySetInnerHTML={{
                      __html: qn.question_text.trim(),
                    }}
                  />
                </Link>
              </li>
            ))}
          </ol>
        ) : (
          <p className="text-gray-500 italic text-sm font-light">
            No Questions Added
          </p>
        )}
      </div>
    </div>
  );
};

export default QuizQuestionCreator;
