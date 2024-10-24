import { useForm, SubmitHandler } from "react-hook-form";

interface ResetType {
  email: string;
}

const RequestResetForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ResetType>();
  const onSubmit: SubmitHandler<ResetType> = () => {};
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">
          Email
        </label>
        <input
          id="email"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
            errors.email ? "border-red-500" : ""
          }`}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid Email",
            },
          })}
          placeholder="Enter your email"
        />
        {errors.email && (
          <p className="text-red-500 text-xs italic font-light mt-1">
            {errors.email.message}
          </p>
        )}
      </div>

      <button
        disabled={isSubmitting}
        type="submit"
        className="w-full bg-brand text-white py-2 rounded-md duration-75 delay-75 hover:opacity-80 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        Request Reset
      </button>
    </form>
  );
};

export default RequestResetForm;
