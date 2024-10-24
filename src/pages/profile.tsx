import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { UserProfileFormValues } from "../types";
import { fetchUser, updateUser } from "../APIRequests/requests";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const UserProfile = () => {
  const { register, handleSubmit, setValue } = useForm<UserProfileFormValues>({
    defaultValues: {
      email: "",
      username: "",
    },
  });
  const { id } = useParams();
  const axiosPrivate = useAxiosPrivate();

//   Fetch the user data
  const { data } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => await fetchUser(id!, axiosPrivate),
  });

//   Update the update form
  useEffect(() => {
    if (data) {
      setValue("email", data?.email);
      setValue("username", data?.username);
    }
  }, [data]);

  //   Mutation
  const { mutateAsync } = useMutation({
    mutationKey: ["updateUser"],
    mutationFn: async (data: UserProfileFormValues) =>
      await updateUser(id!, axiosPrivate, data),
  });

  // Function to handle form submission
  const onSubmit = async (data: UserProfileFormValues) => {
    await mutateAsync(data);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6">User Profile</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            {...register("email")}
            type="email"
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Username</label>
          <input
            {...register("username")}
            type="text"
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>

        <button
          type="submit"
          className="w-max bg-brand text-white py-2 px-5 rounded-md duration-75 delay-75 hover:opacity-80 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
