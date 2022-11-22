type ResponseBase = {
  result: boolean;
  error?: string;
};

export type LoginResponse = ResponseBase;
export type SessionResponse = ResponseBase & {
  status: boolean;
};
