import { axiosRequestPrivate } from "../APIRequests/requestConfig";
import useRefreshToken from "./useRefreshToken";
import { ACCESS_TOKEN } from "../utils/constants";
import { useEffect } from "react";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();

  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    const requestIntercept = axiosRequestPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosRequestPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosRequestPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosRequestPrivate.interceptors.request.eject(requestIntercept);
      axiosRequestPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [refresh]);

  return axiosRequestPrivate;
};

export default useAxiosPrivate;
