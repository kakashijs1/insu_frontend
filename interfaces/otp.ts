interface OTPSend {
  phone: string;
}

interface OTPSendResponse {
  status: string;
  token: string;
  refno: string;
}

interface OTPVerify {
  token: string;
  pin: string;
}

interface OTPVerifyResponse {
  status: string;
  message: string;
}

export type { OTPSend, OTPSendResponse, OTPVerify, OTPVerifyResponse };
