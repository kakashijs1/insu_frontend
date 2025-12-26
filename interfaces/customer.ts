interface Signup {
  name: string;
  phone: string;
  password: string;
  confirm_password: string;
}

interface SignupResponse {
  id: number;
  name: string;
  phone: string;
  created_at: string;
  updated_at: string;
}

export type { Signup, SignupResponse };
