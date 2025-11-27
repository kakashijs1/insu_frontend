import ForgotPasswordOtpForm from '@/components/form/forgot-password-otp-form'

interface PageProps {
  searchParams: Promise<{
    phone: string
  }>
}

export default async function ForgotPasswordOtpPage({
  searchParams,
}: PageProps) {
  const { phone } = await searchParams

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
              VERIFY OTP
            </span>
            <div className='space-y-3'>
              <h1 className='text-3xl font-semibold leading-tight md:text-4xl'>
                ยืนยันรหัส OTP
              </h1>
              <p className='text-base text-white/80 md:text-lg'>
                กรอกรหัส 6 หลักที่ส่งไปยังเบอร์ของคุณ
                เพื่อดำเนินการตั้งรหัสผ่านใหม่อย่างปลอดภัย
              </p>
            </div>
            <div className='rounded-2xl border border-white/25 bg-white/10 p-4 text-sm text-white/80 backdrop-blur-md'>
              เคล็ดลับ: ตรวจสอบ SMS หากไม่พบ
              ลองกดส่งรหัสใหม่หลังเวลานับถอยหลังหมด
            </div>
          </div>
        </section>

        <section className='rounded-3xl border border-border-light bg-bg-white/95 p-6 shadow-[0_25px_90px_rgba(0,0,0,0.12)] md:p-10'>
          <div className='mb-6 space-y-2 text-center md:text-left'>
            <p className='text-[0.7rem] font-semibold uppercase tracking-[0.5em] text-secondary'>
              ลืมรหัสผ่าน
            </p>
            <h2 className='text-2xl font-semibold text-text-dark md:text-3xl'>
              กรอกรหัส OTP 6 หลัก
            </h2>
            <p className='text-sm text-text-medium'>
              ส่ง OTP ไปยังเบอร์ {phone || 'ของคุณ'}{' '}
              หากไม่ได้รับสามารถกดส่งใหม่เมื่อเวลาหมด
            </p>
          </div>
          <ForgotPasswordOtpForm phone={phone} />
        </section>
      </div>
    </div>
  )
}
