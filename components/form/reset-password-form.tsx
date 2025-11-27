'use client'

import { useRouter } from 'next/navigation'
import { ArrowRight, Lock } from 'lucide-react'
import { FormEvent, useState } from 'react'

interface ResetPasswordFormProps {
  phone?: string
}

export default function ResetPasswordForm({ phone }: ResetPasswordFormProps) {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [formError, setFormError] = useState<string | null>(null)

  const isDisabled = !password.trim() || !confirmPassword.trim()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormError(null)

    const newPassword = password.trim()
    const confirm = confirmPassword.trim()

    if (!newPassword || !confirm) {
      setFormError('กรุณากรอกรหัสผ่านใหม่และยืนยันรหัสผ่านให้ครบ')
      return
    }

    if (newPassword !== confirm) {
      setFormError('รหัสผ่านใหม่และยืนยันรหัสผ่านไม่ตรงกัน')
      return
    }

    router.push('/sign-in?reset=success')
  }

  return (
    <form className='space-y-6' onSubmit={handleSubmit}>
      <div className='grid gap-4 sm:grid-cols-2'>
        <div className='space-y-2'>
          <label htmlFor='password' className='input-label'>
            รหัสผ่านใหม่
          </label>
          <div className='input-wrapper'>
            <Lock className='input-icon' />
            <input
              id='password'
              type='password'
              placeholder='อย่างน้อย 8 ตัวอักษร'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className='text-input'
            />
          </div>
        </div>
        <div className='space-y-2'>
          <label htmlFor='confirmPassword' className='input-label'>
            ยืนยันรหัสผ่านใหม่
          </label>
          <div className='input-wrapper'>
            <Lock className='input-icon' />
            <input
              id='confirmPassword'
              type='password'
              placeholder='พิมพ์รหัสผ่านอีกครั้ง'
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className='text-input'
            />
          </div>
        </div>
      </div>

      {phone && (
        <div className='rounded-2xl border border-border-light bg-bg-soft/80 px-4 py-3 text-sm text-text-medium'>
          ดำเนินการรีเซ็ตสำหรับเบอร์ <span className='font-semibold text-text-dark'>{phone}</span>
        </div>
      )}

      {formError && <div className='alert-error'>{formError}</div>}

      <button
        type='submit'
        className='primary-btn disabled:cursor-not-allowed disabled:opacity-60'
        disabled={isDisabled}
      >
        ตั้งรหัสผ่านใหม่
        <ArrowRight className='h-4 w-4' />
      </button>
    </form>
  )
}
