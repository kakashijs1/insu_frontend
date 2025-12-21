'use server'

import { OTPSend, OTPSendResponse } from "@/interfaces/otp";

const sendOTP = async (payload: OTPSend): Promise<OTPSendResponse> => {
  const response = await fetch(`${process.env.BACKEND_ENDPOINT_URL}/otp/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  console.log('Response', response)

  if (!response.ok) {
    throw new Error("Failed to send a OTP");
  }

  const data = await response.json();
  console.log('Data', data)
  return data;
};

export { sendOTP };
