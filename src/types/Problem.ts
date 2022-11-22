import { Contest } from "types/Contest";

export type Problem = {
  id: string;
  title: string;
  description: string;
  problem_id: string;
  contests: Contest[] | null;
  valid: boolean;
};
