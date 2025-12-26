import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  const { name, phone, password, confirm_password } = await req.json();

  const payload = {
    name: name.trim(),
    phone: phone.trim(),
    password: password.trim(),
    confirm_password: confirm_password.trim(),
  };

  const res = await fetch(`${process.env.BACKEND_ENDPOINT_URL}/customers/new`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    return NextResponse.json(
      { message: "Failed to signup your account, Please try again later" },
      { status: res.status }
    );
  }

  //code here tomorrow
  const data = await res.json();
  return NextResponse.json(data);
};
