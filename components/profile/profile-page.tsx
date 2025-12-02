'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowUpRight,
  BookOpen,
  CheckCircle,
  Download,
  FileText,
  Headset,
  Home,
  KeyRound,
  Lock,
  Mail,
  Phone,
  Receipt,
  Shield,
  Users,
} from 'lucide-react'

type PolicyStatus = 'active' | 'pending' | 'lapsed'
type ClaimStatus = 'submitted' | 'in_review' | 'approved' | 'rejected'

type Profile = {
  fullName: string
  memberId: string
  email: string
  phone: string
  language: string
  lastLogin: string
  status: 'verified' | 'pending'
}

type Policy = {
  id: string
  product: string
  tier: string
  premium: number
  currency: string
  nextBilling: string
  renewal: string
  status: PolicyStatus
}

type Claim = {
  id: string
  incidentDate: string
  status: ClaimStatus
  amount: number
  currency: string
  lastUpdate: string
}

type PaymentMethod = {
  brand: string
  last4: string
  exp: string
  autopay: boolean
  billingAddress: string
}

type Security = {
  mfaEnabled: boolean
  lastPasswordChange: string
  devices: string[]
  comms: { email: boolean; sms: boolean }
}

type SupportLink = { label: string; href: string }
type DocumentLink = { label: string; href: string }

type ProfilePageProps = {
  profile: Profile
  policies: Policy[]
  claims: Claim[]
  payment: PaymentMethod
  security: Security
  support: SupportLink[]
  documents: DocumentLink[]
}

const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`rounded-2xl border border-border-light bg-white shadow-sm shadow-gray-200/40 ${className}`}>{children}</div>
)

const SectionTitle = ({ icon: Icon, title, desc }: { icon: React.ElementType; title: string; desc?: string }) => (
  <div className="mb-4 flex items-start gap-3">
    <div className="mt-0.5 rounded-xl bg-bg-light p-2 text-primary">
      <Icon className="h-4 w-4" />
    </div>
    <div>
      <p className="text-sm font-semibold text-primary">{title}</p>
      {desc ? <p className="text-sm text-text-medium">{desc}</p> : null}
    </div>
  </div>
)

const StatusBadge = ({ status }: { status: PolicyStatus | ClaimStatus | 'verified' | 'pending' }) => {
  const palette: Record<string, { text: string; bg: string; label: string }> = {
    active: { text: 'text-green-700', bg: 'bg-green-100', label: 'ใช้งานอยู่' },
    pending: { text: 'text-amber-700', bg: 'bg-amber-100', label: 'รอดำเนินการ' },
    lapsed: { text: 'text-red-700', bg: 'bg-red-100', label: 'หมดอายุ' },
    submitted: { text: 'text-amber-700', bg: 'bg-amber-100', label: 'ส่งคำร้องแล้ว' },
    in_review: { text: 'text-blue-700', bg: 'bg-blue-100', label: 'อยู่ระหว่างตรวจสอบ' },
    approved: { text: 'text-green-700', bg: 'bg-green-100', label: 'อนุมัติแล้ว' },
    rejected: { text: 'text-red-700', bg: 'bg-red-100', label: 'ถูกปฏิเสธ' },
    verified: { text: 'text-green-700', bg: 'bg-green-100', label: 'ยืนยันแล้ว' },
  }
  const colors = palette[status]
  if (!colors) return null
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${colors.text} ${colors.bg}`}>
      <CheckCircle className="h-4 w-4" />
      {colors.label}
    </span>
  )
}

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-start justify-between gap-4 text-sm">
    <span className="text-text-medium">{label}</span>
    <span className="font-semibold text-text-dark">{value}</span>
  </div>
)

export default function ProfilePage({
  profile,
  policies,
  claims,
  payment,
  security,
  support,
  documents,
}: ProfilePageProps) {
  const [autopay, setAutopay] = useState(payment.autopay)
  const [emailPref, setEmailPref] = useState(security.comms.email)
  const [smsPref, setSmsPref] = useState(security.comms.sms)
  const [mfaOn, setMfaOn] = useState(security.mfaEnabled)

  const fireStub = (msg: string) => {
    console.log(msg)
  }

  return (
    <div className="space-y-8">
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -left-12 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute right-6 top-6 h-24 w-24 rounded-full bg-secondary/10 blur-2xl" />
        </div>
        <div className="relative flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm text-text-medium">
              <Home className="h-4 w-4" />
              หน้าหลัก / บัญชี / โปรไฟล์
            </div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-text-dark">ภาพรวมโปรไฟล์ &amp; ความคุ้มครอง</h1>
              <StatusBadge status={profile.status} />
            </div>
            <p className="text-text-medium">
              ตรวจสอบข้อมูลบัญชี ความคุ้มครองที่ใช้งานอยู่ ประวัติการเคลม และการตั้งค่าการเรียกเก็บเงินของคุณได้ในหน้าเดียว
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => fireStub('Edit profile')}
              className="rounded-xl border border-border-light bg-white px-4 py-2 text-sm font-semibold text-primary transition hover:border-primary hover:bg-primary hover:text-white"
            >
              แก้ไขโปรไฟล์
            </button>
            <button
              type="button"
              onClick={() => fireStub('Download policy')}
              className="rounded-xl border border-border-light bg-bg-soft px-4 py-2 text-sm font-semibold text-text-dark transition hover:border-secondary hover:text-primary"
            >
              <div className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                ดาวน์โหลดกรมธรรม์
              </div>
            </button>
            <button
              type="button"
              onClick={() => fireStub('Contact support')}
              className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-secondary"
            >
              ติดต่อเจ้าหน้าที่
            </button>
          </div>
        </div>
      </Card>

      <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="space-y-6">
          <Card className="p-6">
            <SectionTitle icon={Users} title="ข้อมูลส่วนตัว" desc="รายละเอียดโปรไฟล์ที่ได้รับการยืนยันของคุณ" />
            <div className="flex flex-wrap gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-xl font-bold text-white">
                {profile.fullName
                  .split(' ')
                  .map((part) => part.charAt(0))
                  .join('')
                  .slice(0, 2)}
              </div>
              <div className="space-y-1">
                <p className="text-lg font-bold text-text-dark">{profile.fullName}</p>
                <p className="text-sm text-text-medium">รหัสสมาชิก: {profile.memberId}</p>
                <div className="flex flex-wrap gap-2 text-sm text-text-medium">
                  <span className="inline-flex items-center gap-1 rounded-full bg-bg-soft px-3 py-1">
                    <Mail className="h-4 w-4" /> {profile.email}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-bg-soft px-3 py-1">
                    <Phone className="h-4 w-4" /> {profile.phone}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <InfoRow label="ภาษาที่ต้องการใช้" value={profile.language} />
              <InfoRow label="เข้าสู่ระบบล่าสุด" value={profile.lastLogin} />
              <InfoRow label="สถานะ" value={profile.status === 'verified' ? 'ยืนยันแล้ว' : 'รอตรวจสอบ'} />
              <InfoRow label="การป้องกันข้อมูล" value="ได้รับการป้องกันและเฝ้าระวัง" />
            </div>
          </Card>

          <Card className="p-6">
            <SectionTitle icon={Shield} title="ภาพรวมความคุ้มครอง" desc="กรมธรรม์ที่ใช้งานอยู่และรอบต่ออายุ" />
            <div className="grid gap-4 md:grid-cols-2">
              {policies.length === 0 ? (
                <div className="md:col-span-2 rounded-xl bg-bg-light p-6 text-center text-text-medium">
                  ยังไม่มีกรมธรรม์ที่ใช้งานอยู่ เริ่มต้นด้วยการขอใบเสนอราคาเลยตอนนี้
                </div>
              ) : (
                policies.map((p) => (
                  <div key={p.id} className="rounded-2xl border border-border-light bg-bg-soft/60 p-4 shadow-sm">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-semibold text-primary">{p.product}</p>
                        <p className="text-lg font-bold text-text-dark">{p.tier}</p>
                      </div>
                      <StatusBadge status={p.status} />
                    </div>
                    <div className="mt-3 grid gap-2 text-sm text-text-medium">
                      <div className="flex justify-between">
                        <span>เบี้ยประกัน</span>
                        <span className="font-semibold text-text-dark">
                          {p.currency}
                          {p.premium.toLocaleString('en-US')} / เดือน
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>รอบตัดบิลถัดไป</span>
                        <span className="font-semibold text-text-dark">{p.nextBilling}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>วันต่ออายุ</span>
                        <span className="font-semibold text-text-dark">{p.renewal}</span>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <button
                        type="button"
                        onClick={() => fireStub(`View policy ${p.id}`)}
                        className="flex-1 rounded-xl border border-border-light bg-white px-3 py-2 text-sm font-semibold text-primary transition hover:border-primary hover:bg-primary hover:text-white"
                      >
                        ดูรายละเอียดกรมธรรม์
                      </button>
                      <button
                        type="button"
                        onClick={() => fireStub(`Request change ${p.id}`)}
                        className="flex-1 rounded-xl border border-border-light bg-bg-soft px-3 py-2 text-sm font-semibold text-text-dark transition hover:border-secondary hover:text-primary"
                      >
                        ขอเปลี่ยนแปลงความคุ้มครอง
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>

          <Card className="p-6">
            <SectionTitle icon={FileText} title="ภาพรวมการเคลม" desc="กิจกรรมการเคลมล่าสุด" />
            {claims.length === 0 ? (
              <div className="rounded-xl bg-bg-light p-6 text-center text-text-medium">ยังไม่มีการยื่นเคลม</div>
            ) : (
              <div className="space-y-3">
                {claims.map((c) => (
                  <div
                    key={c.id}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border-light/70 bg-white px-4 py-3 shadow-sm"
                  >
                    <div>
                      <p className="text-sm font-semibold text-text-dark">เคลมเลขที่ #{c.id}</p>
                      <p className="text-xs text-text-medium">วันที่เกิดเหตุ: {c.incidentDate}</p>
                    </div>
                    <StatusBadge status={c.status} />
                    <div className="text-right">
                      <p className="text-sm font-semibold text-text-dark">
                        {c.currency}
                        {c.amount.toLocaleString('en-US')}
                      </p>
                      <p className="text-xs text-text-medium">อัปเดตล่าสุด: {c.lastUpdate}</p>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => fireStub('View all claims')}
                  className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-secondary"
                >
                  ดูประวัติการเคลมทั้งหมด <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <SectionTitle icon={Receipt} title="การเรียกเก็บเงิน &amp; การชำระเงิน" desc="วิธีชำระเงินปัจจุบันและกำหนดการเรียกเก็บ" />
            <div className="space-y-3">
              <InfoRow
                label="วิธีชำระเงิน"
                value={`${payment.brand} •••• ${payment.last4} (หมดอายุ ${payment.exp})`}
              />
              <InfoRow
                label="รอบตัดบิลถัดไป"
                value={payment.billingAddress ? 'ดูตารางด้านล่าง' : 'รอบบิลถัดไป'}
              />
              <div className="flex items-center justify-between rounded-xl bg-bg-soft px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-text-dark">ตัดบัตรอัตโนมัติ</p>
                  <p className="text-xs text-text-medium">ตัดบัตรทุก ๆ รอบบิลโดยอัตโนมัติ</p>
                </div>
                <button
                  type="button"
                  onClick={() => setAutopay((v) => !v)}
                  className={`rounded-full px-4 py-1 text-sm font-semibold ${
                    autopay ? 'bg-primary text-white' : 'bg-border-light text-text-dark'
                  }`}
                >
                  {autopay ? 'เปิด' : 'ปิด'}
                </button>
              </div>
              <div className="rounded-xl border border-border-light/70 bg-bg-light p-4 text-sm text-text-medium">
                ที่อยู่สำหรับออกใบแจ้งหนี้:
                <span className="ml-1 font-semibold text-text-dark">{payment.billingAddress}</span>
              </div>
              <button
                type="button"
                onClick={() => fireStub('Download receipt')}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-border-light bg-white px-4 py-2 text-sm font-semibold text-primary transition hover:border-primary hover:bg-primary hover:text-white"
              >
                <Download className="h-4 w-4" /> ดาวน์โหลดใบเสร็จล่าสุด
              </button>
            </div>
          </Card>

          <Card className="p-6">
            <SectionTitle icon={Lock} title="ความปลอดภัย &amp; การตั้งค่า" desc="การเข้าสู่ระบบและการสื่อสาร" />
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between rounded-xl bg-bg-soft px-4 py-3">
                <div>
                  <p className="font-semibold text-text-dark">การยืนยันตัวตนหลายขั้นตอน</p>
                  <p className="text-xs text-text-medium">เพิ่มขั้นตอนเพื่อป้องกันบัญชีของคุณ</p>
                </div>
                <button
                  type="button"
                  onClick={() => setMfaOn((v) => !v)}
                  className={`rounded-full px-4 py-1 font-semibold ${
                    mfaOn ? 'bg-primary text-white' : 'bg-border-light text-text-dark'
                  }`}
                >
                  {mfaOn ? 'เปิด' : 'ปิด'}
                </button>
              </div>
              <InfoRow label="เปลี่ยนรหัสผ่านครั้งล่าสุด" value={security.lastPasswordChange} />
              <div className="rounded-xl border border-border-light/70 bg-white px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-text-medium">
                  เซสชันที่กำลังใช้งาน
                </p>
                <ul className="mt-2 space-y-1 text-sm text-text-dark">
                  {security.devices.map((device) => (
                    <li key={device} className="flex items-center gap-2">
                      <KeyRound className="h-4 w-4 text-secondary" /> {device}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-border-light/70 bg-white px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-text-medium">
                  การรับการสื่อสาร
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setEmailPref((v) => !v)}
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${
                      emailPref ? 'bg-primary text-white' : 'bg-bg-soft text-text-dark'
                    }`}
                  >
                    อีเมล {emailPref ? 'เปิด' : 'ปิด'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setSmsPref((v) => !v)}
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${
                      smsPref ? 'bg-primary text-white' : 'bg-bg-soft text-text-dark'
                    }`}
                  >
                    SMS {smsPref ? 'เปิด' : 'ปิด'}
                  </button>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <SectionTitle icon={Headset} title="ฝ่ายช่วยเหลือ &amp; เอกสาร" desc="ติดต่อเรา หรืออ่านเอกสารสำคัญ" />
            <div className="space-y-3">
              <div className="grid gap-2 text-sm">
                {support.map((s) => (
                  <Link
                    key={s.label}
                    href={s.href}
                    className="flex items-center gap-2 rounded-lg px-2 py-2 text-primary transition hover:text-secondary"
                  >
                    <ArrowUpRight className="h-4 w-4" /> {s.label}
                  </Link>
                ))}
              </div>
              <div className="rounded-xl border border-border-light/70 bg-bg-soft p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-text-medium">เอกสาร</p>
                <div className="mt-2 grid gap-2 text-sm">
                  {documents.map((doc) => (
                    <Link
                      key={doc.label}
                      href={doc.href}
                      className="flex items-center justify-between rounded-lg bg-white px-3 py-2 text-text-dark transition hover:text-primary"
                    >
                      <span className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-secondary" />
                        {doc.label}
                      </span>
                      <Download className="h-4 w-4 text-primary" />
                    </Link>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-border-light/70 bg-white px-3 py-3 text-sm text-text-medium">
                ต้องการความช่วยเหลือเกี่ยวกับโปรไฟล์หรือการเปลี่ยนแปลงความคุ้มครองหรือไม่? ทีมงานที่ได้รับใบอนุญาตของเราพร้อมช่วยคุณตลอด 24 ชั่วโมง
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
