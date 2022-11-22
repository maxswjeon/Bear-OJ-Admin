import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { InternalProblemsResponse } from "types/Responses";

const useInternalProblems = () => {
  return useQuery<InternalProblemsResponse>(["internalproblems"], async () => {
    const { data } = await axios.get<InternalProblemsResponse>(
      process.env.NEXT_PUBLIC_API_URL + "/admin/internalproblems",
      { withCredentials: true }
    );
    return data;
  });
};

export default useInternalProblems;
