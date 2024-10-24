import { FaHome, FaSignOutAlt, FaUser, FaListAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchUser } from "../APIRequests/requests";
import formatDate from "../utils/formatDate";
import { Quiz } from "../types";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const AccountPage = () => {
  const { id } = useParams();
  const axiosPrivate = useAxiosPrivate();

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
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">Title</th>
              <th className="py-2 px-4 text-left">Date Created</th>
              <th className="py-2 px-4 text-left">Deadline</th>
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AccountPage;
