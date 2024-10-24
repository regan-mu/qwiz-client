import { Navigate } from "react-router-dom";
import { useEffect } from "react";
import { logout } from "../APIRequests/requests";
const Logout = () => {
  useEffect(() => {
    const logoutUser = async () => {
      const logoutResponse = await logout();
      if (logoutResponse) {
        localStorage.clear();
      }
    };
    logoutUser();
  }, []);
  return <Navigate to="/" />;
};

export default Logout;
