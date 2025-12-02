import Link from 'next/link'
import { ArrowUpRight, Clock, Mail, MapPin, Phone, Shield } from 'lucide-react'

const footerNav = [
  {
    title: 'ผลิตภัณฑ์',
    links: [
      { label: 'ประกันรถยนต์แบบครบวงจร', href: '#products' },
      { label: 'ความคุ้มครองรถฟลีทและอู่', href: '#price-table' },
      { label: 'ประกันอุบัติเหตุส่วนบุคคล', href: '#quote' },
      { label: 'ทรัพย์สินและความรับผิดชอบ', href: '#services' },
    ],
  },
  {
    title: 'บริษัท',
    links: [
      { label: 'เกี่ยวกับ INSU', href: '#about' },
      { label: 'คณะผู้บริหารและธรรมาภิบาล', href: '#leadership' },
      { label: 'การกำกับดูแลและใบอนุญาต', href: '#compliance' },
      { label: 'ร่วมงานกับเรา', href: '#careers' },
    ],
  },
  {
    title: 'การช่วยเหลือ',
    links: [
      { label: 'ช่วยเหลือการเคลมตลอด 24 ชม.', href: '#claims' },
      { label: 'คำถามที่พบบ่อยและคลังความรู้', href: '#help' },
      { label: 'ศูนย์ติดต่อลูกค้า', href: '#contact' },
      { label: 'สถานะการให้บริการ', href: '#status' },
    ],
  },
]

const contactItems = [
  { icon: Phone, label: 'คอลเซ็นเตอร์', value: '02-000-0000', href: 'tel:020000000' },
  { icon: Mail, label: 'อีเมล', value: 'support@insu.co', href: 'mailto:support@insu.co' },
  { icon: MapPin, label: 'สำนักงานใหญ่', value: 'สาทร กรุงเทพฯ', href: 'https://maps.google.com' },
]

export default function Footer() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-border-light/60 bg-white text-text-dark">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-16 top-[-120px] h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-[-140px] right-[-60px] h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute left-1/2 top-6 h-px w-[70%] -translate-x-1/2 bg-linear-to-r from-transparent via-primary/20 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-10 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.2fr,1fr] lg:items-start">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-secondary shadow-lg shadow-primary/20">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary/80">
                  INSU Assurance
                </p>
                <p className="text-2xl font-bold leading-tight text-text-dark">
                  ประกันภัยที่ออกแบบมาให้เข้าใจง่าย
                </p>
              </div>
            </div>
            <p className="max-w-2xl text-base leading-relaxed text-text-medium">
              เรามอบความคุ้มครองที่โปร่งใส การดูแลเคลมที่รวดเร็ว และทีมที่ปรึกษาเฉพาะ
              สำหรับทั้งธุรกิจและครอบครัว กรมธรรม์ทุกฉบับได้รับการตรวจสอบโดยผู้เชี่ยวชาญที่ได้รับใบอนุญาต
              เพื่อให้เหมาะสมกับภาระผูกพันและเป้าหมายของคุณ
            </p>

            <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
              <div className="rounded-2xl border border-border-light bg-bg-light/80 p-4 shadow-md shadow-primary/10">
                <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                  <Clock className="h-4 w-4" />
                  ศูนย์เคลม 24 ชั่วโมง
                </div>
                <p className="mt-2 text-lg font-bold text-text-dark">พร้อมรับเรื่องภายใน 3 นาที</p>
                <p className="text-sm text-text-medium">
                  มีเจ้าหน้าที่ดูแลเคลมเฉพาะ และอัปเดตสถานะให้โดยตรง
                </p>
              </div>
              <div className="rounded-2xl border border-border-light bg-bg-light/80 p-4 shadow-md shadow-secondary/10">
                <div className="flex items-center gap-2 text-sm font-semibold text-secondary">
                  <ArrowUpRight className="h-4 w-4" />
                  มาตรฐานตามกฎเกณฑ์
                </div>
                <p className="mt-2 text-lg font-bold text-text-dark">มาตรฐานความปลอดภัยระดับ ISO</p>
                <p className="text-sm text-text-medium">
                  ปกป้องข้อมูลและมีกระบวนการที่พร้อมสำหรับการตรวจสอบ
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              {contactItems.map(({ icon: Icon, label, value, href }) => (
                <Link
                  key={label}
                  href={href}
                  className="group flex flex-1 min-w-[220px] items-start gap-3 rounded-2xl border border-border-light bg-bg-light/70 p-4 text-left transition hover:border-primary hover:bg-white"
                >
                  <div className="mt-0.5 rounded-xl bg-white p-2 text-primary shadow-sm">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-semibold uppercase tracking-wide text-text-medium">{label}</p>
                    <p className="text-base font-semibold text-text-dark">{value}</p>
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-primary">
                      ติดต่อเรา
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="grid gap-8 rounded-3xl border border-border-light bg-bg-soft/70 p-8 shadow-xl shadow-primary/10 backdrop-blur-sm">
            <div className="grid gap-6 sm:grid-cols-3 sm:gap-4">
              {footerNav.map((section) => (
                <div key={section.title} className="space-y-3">
                  <p className="text-sm font-semibold uppercase tracking-wider text-text-medium">
                    {section.title}
                  </p>
                  <div className="space-y-2">
                    {section.links.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        className="group flex items-center justify-between rounded-xl px-0 py-2 text-sm font-medium text-text-dark/85 transition hover:text-primary"
                      >
                        {item.label}
                        <ArrowUpRight className="h-4 w-4 text-primary opacity-0 transition group-hover:opacity-100" />
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-2xl border border-border-light bg-white p-5 shadow-inner">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-text-medium">
                พาร์ตเนอร์ที่ได้รับการรับรอง
              </p>
              <p className="mt-2 text-xl font-bold text-text-dark">
                ได้รับใบอนุญาตจาก คปภ. และสอดคล้องกับมาตรฐาน IFRS 17
              </p>
              <p className="text-sm text-text-medium">
                เอกสารกรมธรรม์ เอกสารแนบท้าย และประวัติการเคลม
                สามารถขอรับได้ตามต้องการสำหรับการตรวจสอบหรือการทบทวนด้านธรรมาภิบาล
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-border-light pt-6 text-sm text-text-medium sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} INSU Assurance. สงวนลิขสิทธิ์ทั้งหมด</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link href="#privacy" className="transition hover:text-primary">
              นโยบายความเป็นส่วนตัว
            </Link>
            <Link href="#terms" className="transition hover:text-primary">
              เงื่อนไขการให้บริการ
            </Link>
            <Link href="#cookies" className="transition hover:text-primary">
              ประกาศการใช้คุกกี้
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
