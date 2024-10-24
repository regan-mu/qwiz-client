import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { SignupFormInputs } from "../../types";
import { signupRequest } from "../../APIRequests/requests";

const SignupForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormInputs>();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const onSubmit: SubmitHandler<SignupFormInputs> = async (
    data: SignupFormInputs
  ) => {
    const result = await signupRequest(data);
    if (result) {
      navigate("/login");
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      {/* Email Field */}
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
              message: "Enter a valid email",
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

      {/* Username Field */}
      <div>
        <label htmlFor="username" className="block text-sm font-medium mb-1">
          Username
        </label>
        <input
          type="text"
          id="username"
          className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
            errors.username ? "border-red-500" : ""
          }`}
          {...register("username", {
            required: "Username is required",
            minLength: {
              value: 3,
              message: "Username must be at least 3 characters",
            },
          })}
          placeholder="Enter your username"
        />
        {errors.username && (
          <p className="text-red-500 text-xs italic font-light mt-1">
            {errors.username.message}
          </p>
        )}
      </div>

      {/* Password Field */}
      <div className="relative">
        <label htmlFor="password" className="block text-sm font-medium mb-1">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none ${
              errors.password ? "border-red-500" : ""
            }`}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 5,
                message: "Password must be at least 5 characters long",
              },
            })}
            placeholder="Enter your password"
          />
          <div
            className="absolute right-3 top-3 cursor-pointer text-gray-500 hover:scale-105"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </div>
        </div>
        {errors.password && (
          <p className="text-red-500 text-xs italic font-light mt-1">
            {errors.password.message}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        disabled={isSubmitting}
        type="submit"
        className="w-full bg-brand text-white py-2 rounded-md duration-75 delay-75 hover:opacity-80 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;
