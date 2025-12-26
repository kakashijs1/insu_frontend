"use client";

import { ArrowRight, Clock, Lock, Phone, UserRound } from "lucide-react";
import {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";

import { sendOTP, verifyOTP } from "@/services/otp";
import { signup } from "@/services/customer";

const OTP_LENGTH = 6;

export default function SignUpForm() {
  const router = useRouter();

  const [phone, setPhone] = useState("");
  const [otpDigits, setOtpDigits] = useState(
    Array<string>(OTP_LENGTH).fill("")
  );
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [refno, setRefno] = useState<string | null>(null);

  const [otpSent, setOtpSent] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [otpExpired, setOtpExpired] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const otpTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const otpInputRefs = useRef<Array<HTMLInputElement | null>>([]);

  const stopOtpCountdown = useCallback(() => {
    if (otpTimerRef.current) {
      clearInterval(otpTimerRef.current);
      otpTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      stopOtpCountdown();
    };
  }, [stopOtpCountdown]);

  useEffect(() => {
    if (!otpSent) {
      return;
    }

    stopOtpCountdown();
    otpTimerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          stopOtpCountdown();
          setOtpExpired(true);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => {
      stopOtpCountdown();
    };
  }, [otpSent, stopOtpCountdown]);

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
  };

  const setTokenToLocalStorage = (token: string) => {
    localStorage.setItem("otp-token", token);
  };

  const getTokenFromLocalStorage = () => {
    const token = localStorage.getItem("otp-token");

    if (!token) {
      setFormError("กรุณารีโหลดหน้าเว็บ");
      return "";
    }

    return token;
  };

  const handleSendOtp = useCallback(async () => {
    if (!phone.trim()) return;

    const { status, token, refno: rf } = await sendOTP({ phone });
    if (status !== "success") {
      setFormError("ไม่สามารถส่งรหัส OTP ได้ กรุณาลองใหม่อีกครั้ง");
      return;
    }

    setRefno(rf);
    setTokenToLocalStorage(token);

    stopOtpCountdown();
    setOtpDigits(Array<string>(OTP_LENGTH).fill(""));
    setCountdown(60 * 5);
    setOtpSent(true);
    setOtpExpired(false);
    setFormError(null);
    setTimeout(() => {
      otpInputRefs.current[0]?.focus();
    }, 0);
  }, [phone, stopOtpCountdown]);

  const otpValue = useMemo(() => otpDigits.join(""), [otpDigits]);

  const otpMetaAttributes = {
    "data-otp-ready": otpSent ? "true" : "false",
    "data-otp-countdown": String(countdown),
    "data-otp-length": String(otpValue.length),
  };

  const handleOtpDigitChange = (index: number, rawValue: string) => {
    const value = rawValue.replace(/\D/g, "").slice(-1);

    setOtpDigits((prev) => {
      const next = [...prev];
      next[index] = value;
      return next;
    });

    if (value && index < OTP_LENGTH - 1) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpDigitKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const isBackspace = event.key === "Backspace";
    const isArrowLeft = event.key === "ArrowLeft";
    const isArrowRight = event.key === "ArrowRight";

    if (isBackspace && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }

    if (isArrowLeft && index > 0) {
      event.preventDefault();
      otpInputRefs.current[index - 1]?.focus();
    }

    if (isArrowRight && index < OTP_LENGTH - 1) {
      event.preventDefault();
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const formattedCountdown = countdown.toString().padStart(2, "0");
  const canSendOtp = Boolean(phone.trim()) && !otpSent;
  const isOtpComplete = otpValue.length === OTP_LENGTH;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    if (!otpSent) {
      setFormError("กรุณากดรับ OTP และกรอกรหัสให้ครบก่อนสร้างบัญชี");
      return;
    }

    if (!isOtpComplete) {
      setFormError("กรุณากรอกรหัส OTP ให้ครบ 6 หลัก");
      return;
    }

    if (!countdown) {
      setFormError("รหัส OTP หมดอายุแล้ว กรุณากดส่ง OTP ใหม่");
      return;
    }

    try {
      const token = getTokenFromLocalStorage();
      const verifyOTPPayload = { token, pin: otpDigits.join("") };
      const { status, message } = await verifyOTP(verifyOTPPayload);

      if (status !== "success") {
        setFormError(message);
      }

      const payload = {
        name,
        phone,
        password,
        confirm_password: confirmPassword,
      };

      const { name: nameOfNewUser } = await signup(payload);
      localStorage.removeItem("otp-token");
      alert("สร้างบัญชีสำเร็จ");
      router.replace("/");
    } catch (err) {
      if (err instanceof Error) {
        setFormError(err.message);
      }
    }
  };

  return (
    <form className="space-y-6" {...otpMetaAttributes} onSubmit={handleSubmit}>
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="fullName" className="input-label">
            ชื่อ-นามสกุล
          </label>
          <div className="input-wrapper">
            <UserRound className="input-icon" />
            <input
              id="fullName"
              placeholder="เช่น กุลนที นิลชาติ"
              type="text"
              className="text-input"
              onChange={handleName}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className="input-label">
            เบอร์โทรศัพท์
          </label>
          <div className="input-wrapper">
            <Phone className="input-icon" />
            <input
              id="phone"
              placeholder="08X-XXX-XXXX"
              type="tel"
              inputMode="tel"
              value={phone}
              onChange={handlePhone}
              className="text-input pr-36"
            />
            <button
              type="button"
              onClick={handleSendOtp}
              disabled={!canSendOtp}
              className="otp-button"
            >
              {otpSent ? (
                <>
                  <Clock className="h-3.5 w-3.5" />
                  {formattedCountdown}
                </>
              ) : (
                "ส่ง OTP"
              )}
            </button>
          </div>
          {!phone.trim() && (
            <p className="text-xs text-text-medium">
              กรุณากรอกเบอร์โทรศัพท์ก่อนรับ OTP
            </p>
          )}
          {otpSent && phone.trim() && (
            <div className="mt-1 flex flex-col gap-0.5">
              <p className="text-xs text-secondary">
                ส่งรหัส OTP ไปยังเบอร์โทรศัพท์ของคุณแล้ว
              </p>
              <span className="text-xs text-text-medium">
                รหัสอ้างอิง: {refno}
              </span>
            </div>
          )}
        </div>

        {otpSent && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="input-label">รหัสยืนยัน OTP</span>
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-text-medium">
                {OTP_LENGTH} หลัก
              </span>
            </div>
            <div className="otp-digits-grid">
              {otpDigits.map((digit, index) => (
                <input
                  key={`otp-${index}`}
                  ref={(element) => {
                    otpInputRefs.current[index] = element;
                  }}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={1}
                  value={digit}
                  onChange={(event) =>
                    handleOtpDigitChange(index, event.target.value)
                  }
                  onKeyDown={(event) => handleOtpDigitKeyDown(index, event)}
                  className="otp-digit-input"
                />
              ))}
            </div>
            <div className="flex items-center gap-2 text-xs text-text-medium">
              <Clock className="h-3.5 w-3.5 text-secondary" />
              <span>
                {countdown
                  ? `กรุณากรอกรหัสภายใน ${formattedCountdown} วินาที`
                  : "รหัสหมดอายุแล้ว กรุณากดส่ง OTP ใหม่"}
              </span>
            </div>
            {otpExpired && (
              <div className="alert-error">
                รหัส OTP หมดอายุแล้ว กรุณากดส่งรหัสใหม่
              </div>
            )}
          </div>
        )}

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="password" className="input-label">
              รหัสผ่าน
            </label>
            <div className="input-wrapper">
              <Lock className="input-icon" />
              <input
                id="password"
                placeholder="อย่างน้อย 8 ตัวอักษร"
                type="password"
                className="text-input"
                onChange={handlePassword}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="input-label">
              ยืนยันรหัสผ่าน
            </label>
            <div className="input-wrapper">
              <Lock className="input-icon" />
              <input
                id="confirmPassword"
                placeholder="พิมพ์รหัสผ่านอีกครั้ง"
                type="password"
                className="text-input"
                onChange={handleConfirmPassword}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl bg-bg-soft px-4 py-3 text-sm text-text-medium">
        เราจะส่ง OTP
        เพื่อยืนยันการสมัครและแจ้งเตือนการอัปเดตกรมธรรม์ผ่านเบอร์โทรศัพท์ของคุณเสมอ
      </div>

      {formError && <div className="alert-error">{formError}</div>}

      <button
        type="submit"
        className="primary-btn disabled:cursor-not-allowed disabled:opacity-60"
        disabled={!otpSent || !isOtpComplete || !countdown}
      >
        สร้างบัญชี
        <ArrowRight className="h-4 w-4" />
      </button>
    </form>
  );
}
