import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { QuizFormInputs } from "../../types";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { createQuiz } from "../../APIRequests/requests";
// Define form input types

const QuizForm: React.FC = () => {
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<QuizFormInputs>();

  const { mutateAsync } = useMutation({
    mutationKey: ["quiz-create"],
    mutationFn: async (data: QuizFormInputs) =>
      await createQuiz(data, axiosPrivate),
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });
  const onSubmit: SubmitHandler<QuizFormInputs> = async (data) => {
    // Handle form submission (e.g., API call)
    const response = await mutateAsync(data);
    response?.id && navigate(`/quiz/${response?.id}`);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 max-w-lg mx-auto p-6 bg-whiteSmoke shadow-md rounded-lg"
    >
      {/* Title Field */}
      <div>
        <label htmlFor="title" className="block font-light text-gray-700">
          Title
        </label>
        <input
          id="title"
          type="text"
          {...register("title", { required: "Title is required" })}
          className={`w-full px-3 py-2 border rounded-md font-light text-gray-600  focus:outline-none ${
            errors.title ? "border-red-500" : ""
          }`}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      {/* Description Field */}
      <div>
        <label htmlFor="description" className="block font-light text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          {...register("description", { required: "Description is required" })}
          className={`w-full px-3 font-light text-gray-600  py-2 border rounded-md focus:outline-none resize-none ${
            errors.description ? "border-red-500" : ""
          }`}
          rows={2}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Deadline Field */}
      <div>
        <label htmlFor="deadline" className="block font-light text-gray-700">
          Deadline
        </label>
        <input
          id="deadline"
          type="date"
          {...register("deadline", { required: "Deadline is required" })}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none font-light text-gray-600  ${
            errors.deadline ? "border-red-500" : ""
          }`}
        />
        {errors.deadline && (
          <p className="mt-1 text-sm text-red-600">{errors.deadline.message}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        disabled={isSubmitting}
        type="submit"
        className="w-full bg-brand text-white py-2 rounded-md duration-75 delay-75 hover:opacity-80 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        Submit
      </button>
    </form>
  );
};

export default QuizForm;
