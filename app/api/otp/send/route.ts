import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const payload = await req.json();

  const res = await fetch(`${process.env.BACKEND_ENDPOINT_URL}/otp/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    return NextResponse.json(
      { message: "Failed to send a OTP" },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json({
    status: data.status,
    token: data.token,
    refno: data.refno,
  });
};
