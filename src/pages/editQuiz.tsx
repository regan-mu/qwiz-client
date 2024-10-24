import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import { QuizEdit } from "../types";
import { retrieveQuiz, updateQuiz } from "../APIRequests/requests";
import useAxiosPrivate from "../hooks/useAxiosPrivate"; // API calls to fetch and update the quiz

const EditQuiz: React.FC = () => {
  // Use react-hook-form
  const { register, handleSubmit, setValue } = useForm<QuizEdit>();
  const axiosPrivate = useAxiosPrivate();
  const { id } = useParams();
  const queryClient = useQueryClient();

  // Fetch quiz data by ID
  const {
    data: quiz,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["quizFetch"],
    queryFn: async () => await retrieveQuiz(id!, axiosPrivate),
  });

  // Set form fields when quiz data is loaded
  useEffect(() => {
    if (quiz) {
      setValue("title", quiz.title);
      setValue("description", quiz.description);
      setValue("deadline", quiz.deadline.slice(0, 10)); // Setting just the date part (YYYY-MM-DD)
    }
  }, [quiz, setValue]);

  // Handle form submission
  const mutation = useMutation({
    mutationKey: ["editQuiz"],
    mutationFn: (updatedQuiz: QuizEdit) =>
      updateQuiz(updatedQuiz, axiosPrivate, id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["quizFetch"] });
    },
  });

  const onSubmit = (data: QuizEdit) => {
    mutation.mutate(data);
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading quiz.</p>;

  return (
    <div className="max-w-lg relative mx-auto p-6 shadow-md rounded-lg bg-white">
      <Link className="absolute" to={`/quiz/${id!}`}>
        <button className="mb-5 flex h-auto items-center justify-center gap-2 w-max text-brand  py-1 px-4 rounded-md hover:scale-105 transition">
          <BsArrowLeft />
          Back
        </button>
      </Link>
      <h1 className="text-2xl font-bold mb-4 text-brand text-center">Edit Quiz</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-gray-700 font-medium">
            Title
          </label>
          <input
            id="title"
            type="text"
            {...register("title", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-brand focus:outline-none"
          />
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-gray-700 font-medium"
          >
            Description
          </label>
          <textarea
            id="description"
            {...register("description", { required: true })}
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:ring-1 focus:ring-brand focus:outline-none"
          ></textarea>
        </div>

        {/* Deadline */}
        <div>
          <label htmlFor="deadline" className="block text-gray-700 font-medium">
            Deadline
          </label>
          <input
            id="deadline"
            type="date"
            {...register("deadline", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-brand focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-brand text-white py-2 rounded-md duration-75 delay-75 hover:opacity-80 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditQuiz;
