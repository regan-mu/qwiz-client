export interface LoginFormInputs {
  email: string;
  password: string;
}

export interface SignupFormInputs extends LoginFormInputs {
  username: string;
}

export interface JwtPayload {
  sub: string;
  name: string;
  exp: number;
  user_id: string;
}

export interface Quiz {
  created_at: string;
  creatorId: number;
  deadline: string;
  description: string;
  id: number;
  slug: string;
  title: string;
  responses: QuizResponse[];
  questions: QuestionResponse[];
}

export interface User {
  id: number;
  email: string;
  username: string;
  quizzes: Quiz[];
  responses: QuizResponse[];
}

export interface QuizResponse {
  user: User;
  date: string;
  score: number;
  quiz: QuizEdit
}

export interface QuizProfile {
  title: string;
  deadline: string;
  responses: QuizResponse[];
}

export interface QuizFormInputs {
  title: string;
  description: string;
  deadline: string;
}

export interface Choice {
  answer_text: string;
  isCorrect: boolean;
}

export interface Question {
  question_text: string;
  answers: Choice[];
  quizId?: number;
}

export interface QuizEdit {
  title: string;
  description: string;
  deadline: string;
}

export interface Answer extends Choice {
  id: number;
}

export interface QuestionResponse extends Question {
  id: number;
  answers: Answer[];
}

export interface RespondentAnswers {
  questionId: number;
  id: number;
}

export interface UserProfileFormValues {
  email: string;
  username: string;
}
