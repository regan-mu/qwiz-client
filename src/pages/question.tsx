import React, { useState, useEffect, FormEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { BsArrowLeft, BsFillTrash3Fill } from "react-icons/bs";
import AnswerList from "../components/cards/answerList";
import { retrieveQuestion } from "../APIRequests/requests";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { updateQuestion, deleteQuestion } from "../APIRequests/requests";
import { Question } from "../types";
import DeleteConfirmationModal from "../components/cards/confirmationDeleteModal";
import QuestionField from "../components/cards/questionRichInput";

const QuestionProfile = () => {
  const axiosPrivate = useAxiosPrivate();
  const { id } = useParams();
  const [deleteModalOpen, setDeleteModal] = useState<boolean>(false);
  const [question, setQuestion] = useState<string>("");
  const navigate = useNavigate();

  const { mutateAsync: editQuestion, isPending } = useMutation({
    mutationKey: ["updateQuestion"],
    mutationFn: async (questionData: Question) =>
      await updateQuestion(questionData, axiosPrivate, id!),
  });

  const { mutateAsync: questionDelete } = useMutation({
    mutationKey: ["updateQuestion"],
    mutationFn: async () => await deleteQuestion(axiosPrivate, id!),
  });

  //   Fetch the Question
  const { data } = useQuery({
    queryKey: ["retrieveQuestion"],
    queryFn: async () => await retrieveQuestion(axiosPrivate, id!),
  });

  const handleQuestionChange = (value: string) => {
    setQuestion(value);
  };

  //   Update the default values after data has been fetched
  const [answers, setAnswers] = useState(data?.answers || []);
  useEffect(() => {
    if (data) {
      setAnswers(data?.answers);
      setQuestion(data?.question_text);
    }
  }, [data]);

  // Update question text and correct answer
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const updatedQuestion: Question = {
      question_text: question,
      answers: answers,
    };
    await editQuestion(updatedQuestion);
  };

  // Update correct answer
  const handleAnswerChange = (answerId: number) => {
    setAnswers((prevAnswers) =>
      prevAnswers.map((ans) => ({
        ...ans,
        isCorrect: ans.id === answerId,
      }))
    );
  };

  //   Delete Question
  const handleDeleteQuestion = async () => {
    const result = await questionDelete();
    if (result) {
      setTimeout(() => {
        navigate(`/quiz/${data?.quizId}`);
      }, 2000);
    }
  };

  const openCloseModal = () => {
    setDeleteModal((prev) => !prev);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={openCloseModal}
        onDelete={handleDeleteQuestion}
      />
      <div className="w-full flex h-auto items-center justify-between mb-5 ">
        <Link to={`/quiz/${data?.quizId}`}>
          <button className="flex h-auto items-center justify-center gap-2 w-max text-brand border py-1 px-4 rounded-md border-brand">
            <BsArrowLeft />
            Back
          </button>
        </Link>
        <button data-tip="Delete" className="" onClick={openCloseModal}>
          <BsFillTrash3Fill size={22} className="text-brand" />
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <h1 className="text-xl font-semibold mb-4 font-manrope">
          Question Profile
        </h1>
        <div className="mb-4">
          <QuestionField
            placeholder=""
            question={question}
            handleQuestionText={handleQuestionChange}
          />
        </div>

        {/* Display Answers */}
        <AnswerList answers={answers} onAnswerChange={handleAnswerChange} />

        {/* Submit Button */}
        <div className="mt-4">
          <button
            disabled={isPending}
            type="submit"
            className="w-max px-4 py-2 bg-brand text-white rounded disabled:opacity-60 disabled:cursor-not-allowed hover:bg-opacity-80 transition"
          >
            Update Question
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuestionProfile;
