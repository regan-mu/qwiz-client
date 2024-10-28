import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import QuestionComponent from "../components/cards/questionsMultistep"; // Import the question component
import { retrieveQuiz } from "../APIRequests/requests";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import formatDate from "../utils/formatDate";
import { quizResponses } from "../APIRequests/requests";
import { RespondentAnswers } from "../types";

const QuizAnsweringPage: React.FC = () => {
  const axiosPrivate = useAxiosPrivate();
  const { id } = useParams();
  const [quizScore, setQuizScore] = useState<{
    score: number;
    totalQns: number;
  } | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<RespondentAnswers[]>([]);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [pastDeadline, setPastDeadline] = useState(false);

  //   Fetch the Question
  const { data } = useQuery({
    queryKey: ["retrieveQuestion"],
    queryFn: async () => await retrieveQuiz(id!, axiosPrivate),
  });

  const quizQuestions = data?.questions;
  const totalQuestions = quizQuestions?.length;

  // Handle Select Answer
  const handleAnswerSelect = (questionId: number, answerId: number) => {
    setAnswers((prevAnswers) => {
      const existingAnswerIndex = prevAnswers.findIndex(
        (answer) => answer.questionId === questionId
      );
      if (existingAnswerIndex !== -1) {
        const updatedAnswers = [...prevAnswers];
        updatedAnswers[existingAnswerIndex] = { questionId, id: answerId };
        return updatedAnswers;
      } else {
        return [...prevAnswers, { questionId, id: answerId }];
      }
    });
  };

  // Handle mutation
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["submitResponses"],
    mutationFn: async (answers: RespondentAnswers[]) =>
      await quizResponses(axiosPrivate, id!, answers),
  });

  const handleNextQuestion = () => {
    if (totalQuestions && currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsQuizFinished(true);
    }
  };

  const handleSubmitQuiz = async () => {
    const results = await mutateAsync(answers);
    if (results) {
      setQuizScore(results);
    }
    // Make API call to submit answers
  };

  if (data && new Date() > new Date(data?.deadline)) {
    return <div className="w-full h-full flex items-center justify-center">Sorry! The deadline for this quiz has passed...</div>
  };

  return (
    <div className="w-full mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="border-y border-gray-200 py-4 mb-4">
        <div className="flex w-full h-max justify-between mb-4">
          <h1 className="text-xl font-medium mb-1 text-brand font-manrope">
            {data?.title}
          </h1>
          <p className="text-sm bg-accent flex items-center px-4 rounded-md">
            Submit before: {formatDate(data?.deadline!)}
          </p>
        </div>

        <p className="text-gray-600 font-light">{data?.description}</p>
      </div>

      {!isQuizFinished ? (
        <div>
          {quizQuestions && totalQuestions && (
            <>
              <QuestionComponent
                question={quizQuestions[currentQuestionIndex]}
                onAnswerSelect={handleAnswerSelect}
              />
              <div className="flex justify-between mt-4">
                <button
                  className="bg-brand text-white px-5 py-2 rounded disabled:opacity-60 disabled:cursor-not-allowed"
                  onClick={handleNextQuestion}
                  disabled={
                    !answers.find(
                      (answer) =>
                        answer.questionId ===
                        quizQuestions[currentQuestionIndex].id
                    )
                  }
                >
                  {currentQuestionIndex < totalQuestions - 1
                    ? "Next"
                    : "Finish"}
                </button>
              </div>
            </>
          )}
        </div>
      ) : quizScore === null ? (
        <div className="text-center">
          <h2 className="text-xl font-light mb-2">Quiz Finished!</h2>
          <p className="mb-4 ">
            Click the button below to submit your answers.
          </p>
          <button
          disabled={isPending}
            className="w-max bg-brand text-white py-2 px-5 rounded-md duration-75 delay-75 hover:opacity-80 disabled:opacity-60 disabled:cursor-not-allowed"
            onClick={handleSubmitQuiz}
          >
            Submit Quiz
          </button>
        </div>
      ) : (
        <div className="w-full h-max py-10 flex justify-center items-center">
          <div className="w-48 h-48 border-brand border-[1px] flex items-center justify-center flex-col rounded-full font-manrope text-2xl">
            <p className="">Score</p>
            <h3 className="font-semibold text-4xl">
              {quizScore.score} / {quizScore.totalQns}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizAnsweringPage;
