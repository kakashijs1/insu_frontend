import type { Signup, SignupResponse } from "@/interfaces/customer";

const signup = async (payload: Signup): Promise<SignupResponse> => {
  const response = await fetch(`/api/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  return data;
};

export { signup };
