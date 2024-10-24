// Layout for authentication pages
import { Outlet } from "react-router-dom";
const AuthLayout: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-whiteSmoke">
      <div className="bg-lightBg shadow-md rounded-lg p-6 w-96">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
