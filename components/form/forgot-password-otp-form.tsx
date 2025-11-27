'use client'

import { useRouter } from 'next/navigation'
import { ArrowRight, Clock, RefreshCcw } from 'lucide-react'
import {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

const OTP_LENGTH = 6
const COUNTDOWN_SECONDS = 60

interface ForgotPasswordOtpFormProps {
  phone?: string
}

export default function ForgotPasswordOtpForm({ phone }: ForgotPasswordOtpFormProps) {
  const router = useRouter()
  const [otpDigits, setOtpDigits] = useState(Array<string>(OTP_LENGTH).fill(''))
  const [otpSent, setOtpSent] = useState(Boolean(phone))
  const [countdown, setCountdown] = useState(
    phone ? COUNTDOWN_SECONDS : 0
  )
  const [otpExpired, setOtpExpired] = useState(!phone)
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
    if (!otpSent || countdown <= 0) {
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
  }, [otpSent, countdown, stopOtpCountdown])

  useEffect(() => {
    if (otpSent && countdown === COUNTDOWN_SECONDS) {
      setTimeout(() => {
        otpInputRefs.current[0]?.focus()
      }, 0)
    }
  }, [otpSent, countdown])

  const otpValue = useMemo(() => otpDigits.join(''), [otpDigits])
  const isOtpComplete = otpValue.length === OTP_LENGTH
  const formattedCountdown = countdown.toString().padStart(2, '0')
  const canSubmit = otpSent && isOtpComplete && countdown > 0

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

  const handleResend = () => {
    if (!phone) {
      setFormError('ไม่พบเบอร์โทรที่ต้องการส่งรหัส กรุณากลับไปกรอกใหม่')
      return
    }

    stopOtpCountdown()
    setOtpDigits(Array<string>(OTP_LENGTH).fill(''))
    setCountdown(COUNTDOWN_SECONDS)
    setOtpExpired(false)
    setOtpSent(true)
    setFormError(null)

    setTimeout(() => {
      otpInputRefs.current[0]?.focus()
    }, 0)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormError(null)

    if (!otpSent) {
      setFormError('กรุณากดส่งรหัส OTP ก่อนดำเนินการต่อ')
      return
    }

    if (!isOtpComplete) {
      setFormError('กรุณากรอกรหัส OTP ให้ครบ 6 หลัก')
      return
    }

    if (!countdown) {
      setFormError('รหัส OTP หมดอายุแล้ว กรุณากดส่งรหัสใหม่')
      return
    }

    const targetPhone = phone ? `?phone=${encodeURIComponent(phone)}` : ''
    router.push(`/forgot-password/reset${targetPhone}`)
  }

  return (
    <form className='space-y-6' onSubmit={handleSubmit}>
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
              onChange={(event) => handleOtpDigitChange(index, event.target.value)}
              onKeyDown={(event) => handleOtpDigitKeyDown(index, event)}
              className='otp-digit-input'
            />
          ))}
        </div>
        <div className='flex flex-wrap items-center justify-between gap-3 text-xs text-text-medium'>
          <div className='flex items-center gap-2'>
            <Clock className='h-3.5 w-3.5 text-secondary' />
            <span>
              {countdown
                ? `กรุณากรอกรหัสภายใน ${formattedCountdown} วินาที`
                : 'รหัสหมดอายุแล้ว กรุณากดส่ง OTP ใหม่'}
            </span>
          </div>
          <button
            type='button'
            onClick={handleResend}
            disabled={countdown > 0}
            className='flex items-center gap-1.5 text-secondary hover:text-primary disabled:cursor-not-allowed disabled:text-text-medium'
          >
            <RefreshCcw className='h-3.5 w-3.5' />
            ส่งรหัสอีกครั้ง
          </button>
        </div>
        {otpExpired && (
          <div className='alert-error'>รหัส OTP หมดอายุแล้ว กรุณาส่งรหัสใหม่</div>
        )}
        {phone && (
          <div className='rounded-2xl border border-border-light bg-bg-soft/80 px-4 py-3 text-sm text-text-medium'>
            ส่งรหัสไปที่เบอร์ <span className='font-semibold text-text-dark'>{phone}</span>
          </div>
        )}
      </div>

      {formError && <div className='alert-error'>{formError}</div>}

      <button
        type='submit'
        className='primary-btn disabled:cursor-not-allowed disabled:opacity-60'
        disabled={!canSubmit}
      >
        ยืนยันรหัส OTP
        <ArrowRight className='h-4 w-4' />
      </button>
    </form>
  )
}
