import { FaHome, FaSignOutAlt, FaUser, FaListAlt } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
const AccountLayout = () => {
  const userId = localStorage.getItem("userID");
  return (
    <div className="flex h-screen bg-whiteSmoke">
      {/* Sidebar */}
      <aside className="w-64 bg-brand text-white p-6 space-y-6">
        <h1 className="text-2xl font-bold">Qwiz</h1>
        <nav className="space-y-4">
          <Link to="/" className="flex items-center gap-2 hover:text-gray-300">
            <FaHome /> Home
          </Link>
          <Link
            to={`/account/${userId}`}
            className="flex items-center gap-2 hover:text-gray-300"
          >
            <FaListAlt /> Quizzes
          </Link>
          <Link
            to={`/profile/${userId}`}
            className="flex items-center gap-2 hover:text-gray-300"
          >
            <FaUser /> Profile
          </Link>
          <Link
            to="/logout"
            className="flex items-center gap-2 hover:text-gray-300"
          >
            <FaSignOutAlt /> Logout
          </Link>
        </nav>
      </aside>
      <section className="flex-1 p-10 bg-lightBg overflow-y-auto">
        <Outlet />
      </section>
    </div>
  );
};

export default AccountLayout;
