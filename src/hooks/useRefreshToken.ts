import axiosRequest from "../APIRequests/requestConfig";

const useRefreshToken = () => {
  const refresh = async () => {
    const response = await axiosRequest.get("/auth/refresh", {
      withCredentials: true,
    });
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
