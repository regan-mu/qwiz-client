import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { logout } from "../APIRequests/requests";
const Logout = () => {
  const navigation = useNavigate();
  useEffect(() => {
    const logoutUser = async () => {
      const logoutResponse = await logout();
      if (logoutResponse) {
        localStorage.clear();
        navigation("/");
      }
    };
    logoutUser();
  }, []);
  return;
};

export default Logout;
