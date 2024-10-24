import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [authUserID, setAuthUserID] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuthUserID(null);
    navigate("/logout");
  };

  useEffect(() => {
    setAuthUserID(null);
    const userId = localStorage.getItem("userID");
    if (userId) {
      setAuthUserID(userId);
    }
  }, []);
  return (
    <header className="w-full bg-brand py-8 px-20 fixed border-b border-lightBg z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl text-white font-bold">Qwiz</h1>
        <nav className="space-x-10 flex">
          {authUserID !== null ? (
            <>
              <h3
                className="text-white text-lg py-2 px-5 cursor-pointer hover:underline  "
                onClick={handleLogout}
              >
                Logout
              </h3>
              <Link
                to={`/account/${authUserID}`}
                className="text-white text-lg py-2 px-5 rounded-full hover:underline "
              >
                Account
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-white text-lg py-2 px-5 rounded-full hover:underline "
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-whiteSmoke text-lg text-brand py-2 px-5 rounded-full hover:bg-lightBg"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
