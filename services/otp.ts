import {
  OTPSend,
  OTPSendResponse,
  OTPVerify,
  OTPVerifyResponse,
} from "@/interfaces/otp";

const sendOTP = async (payload: OTPSend): Promise<OTPSendResponse> => {
  const res = await fetch("/api/otp/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  return data;
};

const verifyOTP = async (payload: OTPVerify): Promise<OTPVerifyResponse> => {
  const response = await fetch("/api/otp/verify", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  return data;
};

export { sendOTP, verifyOTP };
