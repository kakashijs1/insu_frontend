'use client'

import { ArrowRight, Clock, Lock, Phone, UserRound } from 'lucide-react'
import {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

const OTP_LENGTH = 6

export default function SignUpForm() {
  const [phone, setPhone] = useState('')
  const [otpDigits, setOtpDigits] = useState(Array<string>(OTP_LENGTH).fill(''))
  const [otpSent, setOtpSent] = useState(false)
  const [countdown, setCountdown] = useState(0)
  const [otpExpired, setOtpExpired] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const otpTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const otpInputRefs = useRef<Array<HTMLInputElement | null>>([])

  const stopOtpCountdown = useCallback(() => {
    if (otpTimerRef.current) {
      clearInterval(otpTimerRef.current)
      otpTimerRef.current = null
    }
  }, [])

  useEffect(() => {
    return () => {
      stopOtpCountdown()
    }
  }, [stopOtpCountdown])

  useEffect(() => {
    if (!otpSent) {
      return
    }

    stopOtpCountdown()
    otpTimerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          stopOtpCountdown()
          setOtpExpired(true)
          return 0
        }

        return prev - 1
      })
    }, 1000)

    return () => {
      stopOtpCountdown()
    }
  }, [otpSent, stopOtpCountdown])

  const handleSendOtp = useCallback(() => {
    if (!phone.trim()) return

    stopOtpCountdown()
    setOtpDigits(Array<string>(OTP_LENGTH).fill(''))
    setCountdown(60)
    setOtpSent(true)
    setOtpExpired(false)
    setFormError(null)
    setTimeout(() => {
      otpInputRefs.current[0]?.focus()
    }, 0)
  }, [phone, stopOtpCountdown])

  const otpValue = useMemo(() => otpDigits.join(''), [otpDigits])

  const otpMetaAttributes = {
    'data-otp-ready': otpSent ? 'true' : 'false',
    'data-otp-countdown': String(countdown),
    'data-otp-length': String(otpValue.length),
  }

  const handleOtpDigitChange = (index: number, rawValue: string) => {
    const value = rawValue.replace(/\D/g, '').slice(-1)

    setOtpDigits((prev) => {
      const next = [...prev]
      next[index] = value
      return next
    })

    if (value && index < OTP_LENGTH - 1) {
      otpInputRefs.current[index + 1]?.focus()
    }
  }

  const handleOtpDigitKeyDown = (
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    const isBackspace = event.key === 'Backspace'
    const isArrowLeft = event.key === 'ArrowLeft'
    const isArrowRight = event.key === 'ArrowRight'

    if (isBackspace && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus()
    }

    if (isArrowLeft && index > 0) {
      event.preventDefault()
      otpInputRefs.current[index - 1]?.focus()
    }

    if (isArrowRight && index < OTP_LENGTH - 1) {
      event.preventDefault()
      otpInputRefs.current[index + 1]?.focus()
    }
  }

  const formattedCountdown = countdown.toString().padStart(2, '0')
  const canSendOtp = Boolean(phone.trim()) && !otpSent
  const isOtpComplete = otpValue.length === OTP_LENGTH

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormError(null)

    if (!otpSent) {
      setFormError('กรุณากดรับ OTP และกรอกรหัสให้ครบก่อนสร้างบัญชี')
      return
    }

    if (!isOtpComplete) {
      setFormError('กรุณากรอกรหัส OTP ให้ครบ 6 หลัก')
      return
    }

    if (!countdown) {
      setFormError('รหัส OTP หมดอายุแล้ว กรุณากดส่ง OTP ใหม่')
      return
    }

    setFormError('นี่เป็น mockup: สามารถต่อ API จริงได้ในขั้นตอนถัดไป')
  }

  return (
    <form className='space-y-6' {...otpMetaAttributes} onSubmit={handleSubmit}>
      <div className='space-y-4'>
        <div className='space-y-2'>
          <label htmlFor='fullName' className='input-label'>
            ชื่อ-นามสกุล
          </label>
          <div className='input-wrapper'>
            <UserRound className='input-icon' />
            <input
              id='fullName'
              placeholder='เช่น กุลนที นิลชาติ'
              type='text'
              className='text-input'
            />
          </div>
        </div>

        <div className='space-y-2'>
          <label htmlFor='phone' className='input-label'>
            เบอร์โทรศัพท์
          </label>
          <div className='input-wrapper'>
            <Phone className='input-icon' />
            <input
              id='phone'
              placeholder='08X-XXX-XXXX'
              type='tel'
              inputMode='tel'
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              className='text-input pr-36'
            />
            <button
              type='button'
              onClick={handleSendOtp}
              disabled={!canSendOtp}
              className='otp-button'
            >
              {otpSent ? (
                <>
                  <Clock className='h-3.5 w-3.5' />
                  {formattedCountdown}s
                </>
              ) : (
                'ส่ง OTP'
              )}
            </button>
          </div>
          {!phone.trim() && (
            <p className='text-xs text-text-medium'>
              กรุณากรอกเบอร์โทรศัพท์ก่อนรับ OTP
            </p>
          )}
          {otpSent && phone.trim() && (
            <p className='text-xs text-secondary'>
              ส่งรหัส OTP ไปยังเบอร์โทรศัพท์ของคุณแล้ว
            </p>
          )}
        </div>

        {otpSent && (
          <div className='space-y-2'>
            <div className='flex items-center justify-between'>
              <span className='input-label'>รหัสยืนยัน OTP</span>
              <span className='text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-text-medium'>
                {OTP_LENGTH} หลัก
              </span>
            </div>
            <div className='otp-digits-grid'>
              {otpDigits.map((digit, index) => (
                <input
                  key={`otp-${index}`}
                  ref={(element) => {
                    otpInputRefs.current[index] = element
                  }}
                  inputMode='numeric'
                  pattern='[0-9]*'
                  maxLength={1}
                  value={digit}
                  onChange={(event) =>
                    handleOtpDigitChange(index, event.target.value)
                  }
                  onKeyDown={(event) => handleOtpDigitKeyDown(index, event)}
                  className='otp-digit-input'
                />
              ))}
            </div>
            <div className='flex items-center gap-2 text-xs text-text-medium'>
              <Clock className='h-3.5 w-3.5 text-secondary' />
              <span>
                {countdown
                  ? `กรุณากรอกรหัสภายใน ${formattedCountdown} วินาที`
                  : 'รหัสหมดอายุแล้ว กรุณากดส่ง OTP ใหม่'}
              </span>
            </div>
            {otpExpired && (
              <div className='alert-error'>
                รหัส OTP หมดอายุแล้ว กรุณากดส่งรหัสใหม่
              </div>
            )}
          </div>
        )}

        <div className='grid gap-4 sm:grid-cols-2'>
          <div className='space-y-2'>
            <label htmlFor='password' className='input-label'>
              รหัสผ่าน
            </label>
            <div className='input-wrapper'>
              <Lock className='input-icon' />
              <input
                id='password'
                placeholder='อย่างน้อย 8 ตัวอักษร'
                type='password'
                className='text-input'
              />
            </div>
          </div>
          <div className='space-y-2'>
            <label htmlFor='confirmPassword' className='input-label'>
              ยืนยันรหัสผ่าน
            </label>
            <div className='input-wrapper'>
              <Lock className='input-icon' />
              <input
                id='confirmPassword'
                placeholder='พิมพ์รหัสผ่านอีกครั้ง'
                type='password'
                className='text-input'
              />
            </div>
          </div>
        </div>
      </div>

      <div className='rounded-2xl bg-bg-soft px-4 py-3 text-sm text-text-medium'>
        เราจะส่ง OTP เพื่อยืนยันการสมัครและแจ้งเตือนการอัปเดตกรมธรรม์ผ่านอีเมลของคุณเสมอ
      </div>

      {formError && <div className='alert-error'>{formError}</div>}

      <button
        type='submit'
        className='primary-btn disabled:cursor-not-allowed disabled:opacity-60'
        disabled={!otpSent || !isOtpComplete || !countdown}
      >
        สร้างบัญชี
        <ArrowRight className='h-4 w-4' />
      </button>
    </form>
  )
}
