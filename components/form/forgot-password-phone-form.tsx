'use client'

import { useRouter } from 'next/navigation'
import { ArrowRight, Phone } from 'lucide-react'
import { FormEvent, useState } from 'react'

export default function ForgotPasswordPhoneForm() {
  const router = useRouter()
  const [phone, setPhone] = useState('')
  const [formError, setFormError] = useState<string | null>(null)

  const isDisabled = !phone.trim()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormError(null)

    const trimmedPhone = phone.trim()
    if (!trimmedPhone) {
      setFormError('กรุณากรอกเบอร์โทรศัพท์ให้ครบถ้วน')
      return
    }

    router.push(`/forgot-password/otp?phone=${encodeURIComponent(trimmedPhone)}`)
  }

  return (
    <form className='space-y-6' onSubmit={handleSubmit}>
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
            className='text-input'
          />
        </div>
        <p className='text-xs text-text-medium'>
          เราจะส่งรหัส OTP เพื่อยืนยันการตั้งรหัสผ่านใหม่
        </p>
      </div>

      {formError && <div className='alert-error'>{formError}</div>}

      <button
        type='submit'
        className='primary-btn disabled:cursor-not-allowed disabled:opacity-60'
        disabled={isDisabled}
      >
        ส่งรหัส OTP
        <ArrowRight className='h-4 w-4' />
      </button>
    </form>
  )
}
