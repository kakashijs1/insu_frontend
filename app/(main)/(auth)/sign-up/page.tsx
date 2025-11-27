import SignUpForm from '@/components/form/sign-up-form'
import { ShieldCheck, Sparkles } from 'lucide-react'

export default function SignUpPage() {
  const highlights = [
    {
      title: 'สมัครไวภายใน 3 นาที',
      description:
        'กรอกข้อมูลครั้งเดียว ระบบแนะนำกรมธรรม์ที่เหมาะสมให้อัตโนมัติ',
      Icon: Sparkles,
    },
    {
      title: 'มั่นใจเรื่องความปลอดภัย',
      description:
        'โครงสร้างพื้นฐานเข้ารหัสหลายชั้น พร้อมทีมดูแลตลอด 24 ชั่วโมง',
      Icon: ShieldCheck,
    },
  ]

  return (
    <div className='min-h-[calc(100vh-5rem)] w-full bg-linear-to-b from-bg-soft via-bg-light to-bg-white px-3 py-10 sm:px-6 lg:px-10'>
      <div className='mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[1.05fr,0.95fr]'>
        <section className='relative overflow-hidden rounded-3xl bg-linear-to-br from-primary via-secondary to-teal p-8 text-white shadow-2xl'>
          <div
            className='pointer-events-none absolute inset-0 opacity-40'
            style={{
              background:
                'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.55), transparent 45%), radial-gradient(circle at 80% 0%, rgba(255,255,255,0.45), transparent 35%)',
            }}
            aria-hidden
          />
          <div className='relative z-10 flex flex-col gap-7'>
            <span className='inline-flex items-center gap-2 self-start rounded-full border border-white/40 bg-white/10 px-4 py-1 text-[0.68rem] font-semibold tracking-[0.35em]'>
              <Sparkles className='h-3.5 w-3.5' />
              2025 READY
            </span>

            <div className='space-y-4'>
              <h1 className='text-3xl font-semibold leading-tight md:text-4xl'>
                สมัครบัญชี สบายใจประกันภัย
                <span className='ml-2 font-light text-white/80'>
                  พร้อมแผนการประกันภัยทุกประเภท
                </span>
              </h1>
              <p className='text-base text-white/80 md:text-lg'>
                เชื่อมต่อข้อมูลดิจิทัล สแกนประวัติโดยไม่กระทบความเป็นส่วนตัว
                และเริ่มใช้งานแผนคุ้มครองแบบ real-time
                ได้ทันทีเมื่อยืนยันตัวตนเสร็จสมบูรณ์
              </p>
            </div>

            <div className='grid gap-4'>
              {highlights.map(({ Icon, title, description }) => (
                <div
                  key={title}
                  className='rounded-2xl border border-white/30 bg-white/10 p-4 text-sm backdrop-blur-md md:text-base'
                >
                  <div className='flex items-center gap-3 font-semibold'>
                    <Icon className='h-5 w-5' />
                    {title}
                  </div>
                  <p className='mt-2 text-white/80'>{description}</p>
                </div>
              ))}
            </div>

            <div className='rounded-3xl border border-white/15 bg-black/15 p-5 text-white/80 backdrop-blur'>
              <div className='text-sm uppercase tracking-[0.5em] text-white/70'>
                INSIGHTS
              </div>
              <p className='mt-3 text-lg font-semibold'>
                98%
                ของสมาชิกใหม่ได้รับอนุมัติทันทีและเริ่มใช้งานได้ภายในวันเดียว
              </p>
            </div>
          </div>
        </section>

        <section className='rounded-3xl border border-border-light bg-bg-white/95 p-6 shadow-[0_25px_90px_rgba(0,0,0,0.12)] md:p-10'>
          <div className='mb-6 space-y-2 text-center md:text-left'>
            <p className='text-[0.7rem] font-semibold uppercase tracking-[0.5em] text-secondary'>
              สบายใจประกันภัย ID
            </p>
            <h2 className='text-2xl font-semibold text-text-dark md:text-3xl'>
              เริ่มต้นใช้งานแบบ Future-ready
            </h2>
            <p className='text-sm text-text-medium'>
              เพื่อการทำประกันภัยที่รวดเร็วและปลอดภัยยิ่งขึ้น
            </p>
          </div>
          <SignUpForm />
        </section>
      </div>
    </div>
  )
}
