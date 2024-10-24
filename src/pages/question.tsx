import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
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

const QuestionProfile = () => {
  const axiosPrivate = useAxiosPrivate();
  const { id } = useParams();
  const [deleteModalOpen, setDeleteModal] = useState<boolean>(false);
  const navigate = useNavigate();

  const { mutateAsync: editQuestion } = useMutation({
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

  //   Handle form
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      question_text: "",
      answers: [],
    },
  });

  //   Update the default values after data has been fetched
  const [answers, setAnswers] = useState(data?.answers || []);
  useEffect(() => {
    if (data) {
      setValue("question_text", data?.question_text);
      setAnswers(data?.answers);
    }
  }, [data, setValue]);

  // Update question text and correct answer
  const onSubmit = async (formData: any) => {
    const updatedQuestion: Question = {
      question_text: formData.question_text,
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
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-xl font-semibold mb-4 font-manrope">
          Question Profile
        </h1>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-semibold mb-2 font-manrope"
            htmlFor="question_text"
          >
            Question:
          </label>
          <input
            {...register("question_text")}
            type="text"
            className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-1 focus:ring-brand"
            placeholder="Enter question text"
          />
        </div>

        {/* Display Answers */}
        <AnswerList answers={answers} onAnswerChange={handleAnswerChange} />

        {/* Submit Button */}
        <div className="mt-4">
          <button
            type="submit"
            className="bg-brand text-white px-4 py-2 rounded-lg"
          >
            Update Question
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuestionProfile;
