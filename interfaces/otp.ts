interface OTPSend {
  phone: string;
}

interface OTPSendResponse {
  status: string;
  token: string;
  refno: string;
}

export { OTPSend, OTPSendResponse };
