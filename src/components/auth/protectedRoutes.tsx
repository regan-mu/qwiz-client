import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ACCESS_TOKEN } from "../../utils/constants";
import { JwtPayload } from "../../types";
import axiosRequest from "../../APIRequests/requestConfig";

const ProtectedRoutes: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthorised, setIsAuthorised] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    validateAccessToken().catch((error) => {
      setIsAuthorised(false);
      return error;
    });
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axiosRequest.get("/auth/refresh");
      localStorage.setItem(ACCESS_TOKEN, response?.data?.accessToken);
      setIsAuthorised(true);
    } catch (error) {
      setIsAuthorised(false)
    }
  };

  const validateAccessToken = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      setIsAuthorised(false);
      return;
    }
    const decoded: JwtPayload = jwtDecode(token);
    const now = Date.now() / 1000;
    if (now > decoded.exp) {
      await refreshToken();
    } else {
      setIsAuthorised(true);
    }
  };
  if (isAuthorised === null) {
    return <div>Loading...</div>;
  }
  return isAuthorised ? (
    <>{children}</>
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoutes;
