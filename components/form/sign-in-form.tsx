'use client'

import Link from 'next/link'
import { ArrowRight, Lock, Phone } from 'lucide-react'
import { FormEvent, useState } from 'react'

export default function SignInForm() {
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [formError, setFormError] = useState<string | null>(null)

  const isDisabled = !phone.trim() || !password.trim()

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormError(null)

    if (!phone.trim() || !password.trim()) {
      setFormError('กรุณากรอกเบอร์โทรศัพท์และรหัสผ่านให้ครบ')
      return
    }

    setFormError('นี่เป็น mockup: โปรดเชื่อมต่อ API เข้าสู่ระบบในขั้นถัดไป')
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
      </div>

      <div className='space-y-2'>
        <label htmlFor='password' className='input-label'>
          รหัสผ่าน
        </label>
        <div className='input-wrapper'>
          <Lock className='input-icon' />
          <input
            id='password'
            placeholder='รหัสผ่าน'
            type='password'
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className='text-input'
          />
        </div>
      </div>

      <div className='flex items-center justify-between text-sm'>
        <span className='text-text-medium'>
          ยังไม่มีหน้าเปลี่ยนรหัสผ่าน จะเพิ่มในขั้นถัดไป
        </span>
        <Link
          href='/forgot-password'
          className='font-semibold text-secondary hover:text-primary'
        >
          ลืมรหัสผ่าน?
        </Link>
      </div>

      {formError && <div className='alert-error'>{formError}</div>}

      <button
        type='submit'
        className='primary-btn disabled:cursor-not-allowed disabled:opacity-60'
        disabled={isDisabled}
      >
        เข้าสู่ระบบ
        <ArrowRight className='h-4 w-4' />
      </button>
    </form>
  )
}
