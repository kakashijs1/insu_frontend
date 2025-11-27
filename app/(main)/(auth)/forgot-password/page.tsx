import ForgotPasswordPhoneForm from '@/components/form/forgot-password-phone-form'

export default function ForgotPasswordPage() {
  return (
    <div className='min-h-[calc(100vh-5rem)] w-full bg-linear-to-b from-bg-soft via-bg-light to-bg-white px-3 py-10 sm:px-6 lg:px-10'>
      <div className='mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1.05fr,0.95fr]'>
        <section className='relative overflow-hidden rounded-3xl bg-linear-to-br from-primary via-secondary to-teal p-8 text-white shadow-2xl'>
          <div
            className='pointer-events-none absolute inset-0 opacity-45'
            style={{
              background:
                'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.5), transparent 45%), radial-gradient(circle at 80% 0%, rgba(255,255,255,0.4), transparent 35%)',
            }}
            aria-hidden
          />
          <div className='relative z-10 space-y-6'>
            <span className='inline-flex items-center gap-2 self-start rounded-full border border-white/35 bg-white/10 px-4 py-1 text-[0.68rem] font-semibold tracking-[0.35em]'>
              RESET READY
            </span>
            <div className='space-y-3'>
              <h1 className='text-3xl font-semibold leading-tight md:text-4xl'>
                รีเซ็ตรหัสผ่านอย่างปลอดภัย
              </h1>
              <p className='text-base text-white/80 md:text-lg'>
                ยืนยันตัวตนด้วยเบอร์โทรศัพท์ก่อนตั้งรหัสผ่านใหม่ เพื่อความปลอดภัยสูงสุดของบัญชีคุณ
              </p>
            </div>
            <div className='rounded-2xl border border-white/25 bg-white/10 p-4 text-sm text-white/80 backdrop-blur-md'>
              ระบบจะส่งรหัส OTP ให้เฉพาะเบอร์ที่ลงทะเบียนไว้เท่านั้น
            </div>
          </div>
        </section>

        <section className='rounded-3xl border border-border-light bg-bg-white/95 p-6 shadow-[0_25px_90px_rgba(0,0,0,0.12)] md:p-10'>
          <div className='mb-6 space-y-2 text-center md:text-left'>
            <p className='text-[0.7rem] font-semibold uppercase tracking-[0.5em] text-secondary'>
              ลืมรหัสผ่าน
            </p>
            <h2 className='text-2xl font-semibold text-text-dark md:text-3xl'>
              กรอกเบอร์โทรเพื่อรับรหัส OTP
            </h2>
            <p className='text-sm text-text-medium'>
              เราจะส่งรหัสยืนยันไปยังเบอร์ที่คุณใช้สมัครสมาชิก
            </p>
          </div>
          <ForgotPasswordPhoneForm />
        </section>
      </div>
    </div>
  )
}
