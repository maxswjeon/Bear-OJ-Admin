import { Problem } from "types/Problem";

export type Contest = {
  id: string;
  title: string;
  time_start: string;
  time_end: string;
  time_freeze: string;
  problems: Problem[] | null;
  valid: boolean;
};
