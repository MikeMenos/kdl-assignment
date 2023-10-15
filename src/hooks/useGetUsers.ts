import { useQuery } from "react-query";
import axios from "axios";
import { BASE_URL } from "../misc/constants";

const useGetUsers = () => {
  const getUsers = async () => {
    return await axios(`${BASE_URL}/users`);
  };

  const { data, isLoading, isError } = useQuery("users", getUsers);

  return { users: data?.data, isLoading, isError };
};

export default useGetUsers;