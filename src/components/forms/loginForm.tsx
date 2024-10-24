import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate, useLocation } from "react-router-dom";
import { LoginFormInputs } from "../../types";
import { loginRequest } from "../../APIRequests/requests";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>();

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit: SubmitHandler<LoginFormInputs> = async (
    data: LoginFormInputs
  ) => {
    const result = await loginRequest(data);
    if (result && typeof result !== "boolean") {
      localStorage.setItem("userID", result?.id.toString());
      navigate(location?.state?.from?.pathname || `/account/${result?.id}`);
      reset();
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

      {/* Password Field */}
      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1">
          Password
        </label>
        <div className="w-full relative rounded-md">
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

      <button
        disabled={isSubmitting}
        type="submit"
        className="w-full bg-brand text-white py-2 rounded-md duration-75 delay-75 hover:opacity-80 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        Log In
      </button>
    </form>
  );
};

export default LoginForm;
