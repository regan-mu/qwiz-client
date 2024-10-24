import { isAxiosError } from "axios";
import { toast } from "react-toastify";
import axiosRequest from "./requestConfig";
import {
  LoginFormInputs,
  Quiz,
  QuizEdit,
  SignupFormInputs,
  User,
  QuestionResponse,
  Question,
  RespondentAnswers,
  UserProfileFormValues,
} from "../types";
import { ACCESS_TOKEN } from "../utils/constants";
import { QuizFormInputs } from "../types";

export const loginRequest = async (
  data: LoginFormInputs
): Promise<User | boolean> => {
  try {
    const res = await axiosRequest.post("/auth/login", data);
    localStorage.setItem(ACCESS_TOKEN, res?.data?.accessToken);
    toast.success("Login Successful");
    return res?.data?.user;
  } catch (error) {
    if (isAxiosError(error)) {
      toast.error(error?.response?.data?.message);
    }
    return false;
  }
};

export const signupRequest = async (
  data: SignupFormInputs
): Promise<boolean> => {
  try {
    const res = await axiosRequest.post("/user/register", data);
    toast.success(res?.data?.message);
    return true;
  } catch (error) {
    if (isAxiosError(error)) {
      toast.error(error?.response?.data?.message);
    }
    return false;
  }
};

export const logout = async (): Promise<boolean> => {
  try {
    await axiosRequest.post("/auth/logout");
    return true;
  } catch (error) {
    if (isAxiosError(error)) {
      toast.error(error?.response?.data?.message);
    } else {
      toast.error("Couldn't log you out!");
    }
    return false;
  }
};

export const fetchUser = async (
  userId: string,
  axiosPrivate: any
): Promise<User | undefined> => {
  try {
    const res = await axiosPrivate.get(`/user/retrieve/${userId}`);
    return res?.data;
  } catch (error) {
    if (isAxiosError(error)) {
      toast.error(error?.response?.data?.message);
    } else {
      toast.error("Something went wrong! Try again");
    }
  }
};
export const updateUser = async (
  userId: string,
  axiosPrivate: any,
  data: UserProfileFormValues
): Promise<User | undefined> => {
  try {
    const res = await axiosPrivate.put(`/user/retrieve/${userId}`, data);
    toast.success(res?.data?.message);
    return res?.data?.user;
  } catch (error) {
    if (isAxiosError(error)) {
      toast.error(error?.response?.data?.message);
    } else {
      toast.error("Something went wrong! Try again");
    }
  }
};

export const retrieveQuiz = async (
  quizId: string,
  axiosPrivate: any
): Promise<Quiz | undefined> => {
  try {
    const res = await axiosPrivate.get(`/quizzes/quiz/${quizId}`);
    return res?.data;
  } catch (error) {
    if (isAxiosError(error)) {
      toast.error(error?.response?.data?.message);
    } else {
      toast.error("Something went wrong! Try again");
    }
  }
};

export const createQuiz = async (
  data: QuizFormInputs,
  axiosPrivate: any
): Promise<Quiz | undefined> => {
  try {
    const res = await axiosPrivate.post(`/quizzes`, data);
    toast.success("Quiz created successfully");
    return res?.data?.quiz;
  } catch (error) {
    if (isAxiosError(error)) {
      toast.error(error?.response?.data?.message);
    } else {
      toast.error("Something went wrong! Try again");
    }
    throw error;
  }
};

export const addQuizAnswers = async (
  data: Question,
  axiosPrivate: any,
  quizID: string
): Promise<boolean | undefined> => {
  try {
    const res = await axiosPrivate.post(
      `/quizzes/quiz/${quizID}/questions`,
      data
    );
    toast.success(res?.data?.message);
    return true;
  } catch (error) {
    if (isAxiosError(error)) {
      toast.error(error?.response?.data?.message);
    } else {
      toast.error("Something went wrong! Try again");
    }
    throw error;
  }
};

export const fetchQuizQuestions = async (
  axiosPrivate: any,
  quizID: string
): Promise<{ questions: QuestionResponse[]; quiz: string } | undefined> => {
  try {
    const res = await axiosPrivate.get(`/quizzes/quiz/${quizID}/questions`);
    toast.success(res?.data?.message);
    return res?.data;
  } catch (error) {
    if (isAxiosError(error)) {
      toast.error(error?.response?.data?.message);
    } else {
      toast.error("Something went wrong! Try again");
    }
    throw error;
  }
};

// Retrieve Question
export const retrieveQuestion = async (
  axiosPrivate: any,
  questionID: string
): Promise<QuestionResponse | undefined> => {
  try {
    const res = await axiosPrivate.get(`/questions/${questionID}`);
    toast.success(res?.data?.message);
    return res?.data;
  } catch (error) {
    if (isAxiosError(error)) {
      toast.error(error?.response?.data?.message);
    } else {
      toast.error("Something went wrong! Try again");
    }
    throw error;
  }
};

// Update Question
export const updateQuestion = async (
  data: Question,
  axiosPrivate: any,
  questionID: string
): Promise<Question | undefined> => {
  try {
    const res = await axiosPrivate.put(`/questions/${questionID}`, { data });
    toast.success(res?.data?.message);
    return res?.data;
  } catch (error) {
    if (isAxiosError(error)) {
      toast.error(error?.response?.data?.message);
    } else {
      toast.error("Something went wrong! Try again");
    }
    throw error;
  }
};

// Update Quiz
export const updateQuiz = async (
  data: QuizEdit,
  axiosPrivate: any,
  quizID: string
): Promise<Question | undefined> => {
  try {
    const res = await axiosPrivate.put(`/quizzes/quiz/${quizID}`, { data });
    toast.success(res?.data?.message);
    return res?.data;
  } catch (error) {
    if (isAxiosError(error)) {
      toast.error(error?.response?.data?.message);
    } else {
      toast.error("Something went wrong! Try again");
    }
    throw error;
  }
};

// DeleteQuiz
export const deleteQuiz = async (
  axiosPrivate: any,
  quizID: string
): Promise<boolean | undefined> => {
  try {
    const res = await axiosPrivate.delete(`/quizzes/quiz/${quizID}`);
    toast.success(res?.data?.message);
    return true;
  } catch (error) {
    if (isAxiosError(error)) {
      toast.error(error?.response?.data?.message);
    } else {
      toast.error("Something went wrong! Try again");
    }
    throw error;
  }
};

// Delete Question
export const deleteQuestion = async (
  axiosPrivate: any,
  questionID: string
): Promise<boolean | undefined> => {
  try {
    const res = await axiosPrivate.delete(`/questions/${questionID}`);
    toast.success(res?.data?.message);
    return true;
  } catch (error) {
    if (isAxiosError(error)) {
      toast.error(error?.response?.data?.message);
    } else {
      toast.error("Something went wrong! Try again");
    }
    throw error;
  }
};

// Submit Quiz responses
export const quizResponses = async (
  axiosPrivate: any,
  quizID: string,
  responses: RespondentAnswers[]
): Promise<
  | {
      score: number;
      totalQns: number;
    }
  | undefined
> => {
  try {
    const res = await axiosPrivate.post(`/quizzes/quiz/${quizID}/responses`, {
      responses,
    });
    return res?.data;
  } catch (error) {
    if (isAxiosError(error)) {
      toast.error(error?.response?.data?.message);
    } else {
      toast.error("Something went wrong! Try again");
    }
    throw error;
  }
};
