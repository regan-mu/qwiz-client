import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { v4 } from "uuid";
import { FaExternalLinkAlt } from "react-icons/fa";
import { fetchUser } from "../APIRequests/requests";
import formatDate from "../utils/formatDate";
import { Quiz } from "../types";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import QuizToggleSwitch from "../components/cards/switch";

const AccountPage = () => {
  const { id } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const [showCreatedQuizzes, setShowCreatedQuizzes] = useState(true);

  const handleToggle = (isCreated: boolean) => {
    setShowCreatedQuizzes(isCreated);
  };

  const { data } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => await fetchUser(id!, axiosPrivate),
  });

  return (
    <>
      {/* User Greeting */}
      <div className="w-full h-auto flex justify-between items-center mb-10">
        <h2 className="text-xl font-light">
          Welcome, <span className="text-brand">{data?.username}</span>!
        </h2>
        <Link to="/new-quiz">
          <button className="px-5 py-2 bg-brand text-white rounded-full">
            Create Quiz
          </button>
        </Link>
      </div>
      {/* Quizzes Table */}
      <div className="w-full h-20 my-5 flex gap-5 items-center justify-center font-manrope">
        <QuizToggleSwitch onToggle={handleToggle} />
      </div>
      <div className="overflow-x-auto">
        {showCreatedQuizzes ? (
          <table className="min-w-full bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gray-100 font-manrope">
                <th className="py-2 px-4 text-left">Title</th>
                <th className="py-2 px-4 text-left">Date Created</th>
                <th className="py-2 px-4 text-left">Deadline</th>
                <th className="py-2 px-4 text-left">More</th>
              </tr>
            </thead>
            <tbody>
              {data?.quizzes.map((quiz: Quiz) => (
                <tr key={quiz.id} className="border-t">
                  <td className="py-2 px-4">
                    <Link to={`/quiz/${quiz.id}`}>{quiz.title}</Link>
                  </td>
                  <td className="py-2 px-4">{formatDate(quiz.created_at)}</td>
                  <td className="py-2 px-4">{formatDate(quiz.deadline)}</td>
                  <td className="py-2 px-4 text-blue-600">
                    <Link to={`/quiz/${quiz.id}`}>
                      <FaExternalLinkAlt />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <table className="min-w-full bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gray-100 font-manrope">
                <th className="py-2 px-4 text-left">Title</th>
                <th className="py-2 px-4 text-left">Response Date</th>
                <th className="py-2 px-4 text-left">Score</th>
              </tr>
            </thead>
            <tbody>
              {data?.responses?.map((response) => (
                <tr key={v4()}>
                  <td className="py-2 px-4">{response.quiz.title}</td>
                  <td className="py-2 px-4">{formatDate(response.date)}</td>
                  <td className="py-2 px-4">{response.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default AccountPage;
