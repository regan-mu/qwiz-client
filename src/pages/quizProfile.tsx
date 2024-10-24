import QuizProfileTable from "../components/tables/quizProfileTable";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { deleteQuiz, retrieveQuiz } from "../APIRequests/requests";
import formatDate from "../utils/formatDate";
import DeleteConfirmationModal from "../components/cards/confirmationDeleteModal";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { AiFillCopy } from "react-icons/ai";
import { v4 } from "uuid";
import { BsFillTrash3Fill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";

// Component to display the quiz profile
const QuizProfile: React.FC = () => {
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  const [deleteModalOpen, setDeleteModal] = useState<boolean>(false);
  const { id } = useParams();
  const axiosPrivate = useAxiosPrivate();
  const userId = localStorage.getItem("userID");
  const navigation = useNavigate();

  const { data } = useQuery({
    queryKey: ["quiz"],
    queryFn: async () => await retrieveQuiz(id!, axiosPrivate),
  });
  const quizLink = `${import.meta.env.VITE_DOMAIN}/quiz/${data?.id}/respond`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(quizLink);
      setCopySuccess("Link copied!");
    } catch (err) {
      setCopySuccess("Failed to copy link.");
    }
    setTimeout(() => setCopySuccess(null), 2000);
  };

  const { mutateAsync } = useMutation({
    mutationKey: ["deleteQuiz"],
    mutationFn: async () => await deleteQuiz(axiosPrivate, id!),
  });

  const handleQuizDelete = async () => {
    const result = await mutateAsync();
    if (result) {
      setTimeout(() => {
        navigation(`/account/${userId}`);
      }, 2000);
    }
  };

  const openCloseModal = () => {
    setDeleteModal((prev) => !prev);
  };


  return (
    <div className="max-w-4xl mx-auto rounded-lg shadow-md6">
      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={openCloseModal}
        onDelete={handleQuizDelete}
      />
      <div className="flex justify-between items-start">
        <div className="w-full">
          <h1 className="text-3xl font-bold text-brand">{data?.title}</h1>
          <p className="w-2/3 text-gray-500  mb-4">{data?.description}</p>
        </div>
        <div className="flex gap-5 w-max h-max items-center">
          <Link to={`/quiz/${id}/questions`}>
            <button className="px-5 w-max py-2 bg-brand text-white rounded-full hover:bg-opacity-80 transition">
              Add Questions
            </button>
          </Link>
          <Link to={`/quiz/${id}/edit`}>
            <AiFillEdit size={22} className="text-brand" />
          </Link>
          <button className="" onClick={openCloseModal}>
            <BsFillTrash3Fill size={22} className="text-brand" />
          </button>
        </div>
      </div>
      <p className="text-gray-600">
        <strong>Deadline:</strong> {data && formatDate(data?.deadline)}
      </p>
      <p className="text-gray-600">
        <strong>Total Responses:</strong> {data?.responses?.length}
      </p>
      <div className="text-gray-600 flex h-max items-center gap-1">
        <strong>Link:</strong>{" "}
        <span className="flex h-auto items-center  gap-2 relative">
          <p className="text-sm bg-gray-200 py-[2px] px-2">{quizLink}</p>
          <button onClick={handleCopy} className=" text-brand">
            <AiFillCopy size={20} />
          </button>
          {copySuccess && (
            <p className="text-green-600 text-xs">{copySuccess}</p>
          )}
        </span>
      </div>
      <p className="text-gray-600">
        <strong>Average Score:</strong>{" "}
        {data?.responses?.length
          ? (
              data?.responses?.reduce((acc, curr) => acc + curr.score, 0) /
              data?.responses?.length
            ).toFixed(2)
          : "0"}
      </p>
      {data?.questions && data?.questions?.length > 0 && (
        <div className="mt-5 border-y-[0.05px] py-5 border-gray-200">
          <h3 className="text-xl mb-2">Questions for this Quiz</h3>
          <ul className="font-light list-inside list-decimal">
            {data?.questions.map((qn) => (
              <li className="hover:text-brand transition w-max" key={v4()}>
                <Link to={`/question/${qn.id}`}>{qn.question_text}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {data?.responses && data?.responses.length > 0 && (
        <div className="mt-6">
          {<QuizProfileTable data={data?.responses ?? []} />}
        </div>
      )}
    </div>
  );
};

export default QuizProfile;
