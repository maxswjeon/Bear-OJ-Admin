import { Contest } from "types/Contest";
import { InternalProblem } from "types/InternalProblem";
import { Problem } from "types/Problem";
import { User } from "types/Users";

type ResponseBase = {
  result: boolean;
  error?: string;
};

export type UsersResponse = ResponseBase & {
  users: User[] | null;
};

export type ContestsResponse = ResponseBase & {
  contests: Contest[] | null;
};

export type ProblemsResponse = ResponseBase & {
  problems: Problem[] | null;
};

export type InternalProblemsResponse = ResponseBase & {
  internalproblems: InternalProblem[] | null;
};
