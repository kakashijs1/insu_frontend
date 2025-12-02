# Profile Page Mockup (Frontend Only)

วัตถุประสงค์: สร้างหน้าโปรไฟล์หลังผู้ใช้สมัคร/ล็อกอินแล้ว ใช้ข้อมูล mock ไม่ผูก backend ยัง รองรับปรับใช้กับข้อมูลจริงภายหลัง

## ส่วนหลักของหน้า
1) Shell & Header
- Breadcrumb: Home > Account > Profile
- Title + บรรยายสั้น (Profile & Coverage Overview)
- ปุ่ม: Edit Profile (sheet/modal stub), Download Policy (stub), Contact Support

2) Identity Card
- Avatar (ตัวอักษรย่อ), ชื่อเต็ม, Member ID, badge สถานะ (Verified/Pending)
- อีเมล, โทรศัพท์, ภาษาที่ใช้, last login
- Trust indicators: Data protected, 24/7 support

3) Coverage Snapshot
- การ์ดกรมธรรม์: product, tier, premium/เดือน, next billing, renewal, status chip
- CTA: View policy (stub), Request change (modal stub)
- Empty state: ข้อความ + CTA “Get a quote”

4) Claims Overview
- 3–5 เคลมล่าสุด: claim no., incident date, status, amount, last update
- CTA: View all claims
- Empty state: “ยังไม่มีการยื่นเคลม”

5) Billing & Payment
- วิธีจ่ายหลัก (mask), รอบบิล, next charge, ลิงก์ใบเสร็จ (stub)
- Billing address สรุป + ปุ่มแก้ไข (stub)
- Autopay toggle (state ใน UI)

6) Security & Preferences
- MFA status, last password change, devices/sessions list (placeholder)
- Communication prefs: toggle อีเมล/SMS (UI state)
- ปุ่ม Manage sessions, Update password (stub)

7) Support & Documents
- ช่องทางด่วน: โทร, อีเมล, Live chat button (stub)
- Download center: policy wording, terms, privacy (stub)
- FAQ ลิงก์เกี่ยวข้อง

## การโต้ตอบ (ยังไม่ต่อ backend)
- ปุ่ม/ลิงก์ยิง toast หรือ console.log เพื่อบอกว่าเป็น stub
- Toggle และฟอร์ม modal ใช้ state ภายใน
- Modal/Sheet แสดงฟอร์ม mock ปิดด้วย toast “Coming soon”

## แนวสไตล์
- ใช้ theme เดิม: primary, secondary, bg-light, bg-soft, text-dark, text-medium
- การ์ด: rounded-2xl, border-border-light, เงาอ่อน
- ชิปสถานะ: เขียว=active/verified, เหลือง=pending, แดง=action needed
- Responsive: เดสก์ท็อปสองคอลัมน์, มือถือคอลัมน์เดียว

## โครงคอมโพเนนต์ที่ใช้
- `components/profile/ProfilePage.tsx` (shell + layout)
- `components/profile/ProfileHeader.tsx`
- `components/profile/IdentityCard.tsx`
- `components/profile/CoverageList.tsx`
- `components/profile/ClaimsList.tsx`
- `components/profile/BillingCard.tsx`
- `components/profile/SecurityCard.tsx`
- `components/profile/SupportPanel.tsx`
- Shared: `StatusBadge`, `InfoRow`, `Card` wrapper

## ตัวอย่าง mock data type
```ts
type Policy = { id: string; product: string; tier: string; premium: number; currency: string; nextBilling: string; renewal: string; status: 'active'|'pending'|'lapsed' };
type Claim = { id: string; incidentDate: string; status: 'submitted'|'in_review'|'approved'|'rejected'; amount: number; currency: string; lastUpdate: string };
type PaymentMethod = { brand: string; last4: string; exp: string; autopay: boolean };
```

## ขั้นตอนลงมือ
1) เพิ่มคอมโพเนนต์ใน `components/profile/` พร้อม mock data
2) สร้างเพจ `app/(main)/profile/page.tsx` เรียก `ProfilePage`
3) ส่ง mock data ผ่าน props ไปแต่ละส่วน
4) ใส่ toast/console สำหรับปุ่ม stub
5) เช็ก responsive ด้วยตนเอง

## Hook สำหรับเชื่อมต่อภายหลัง
- เปลี่ยน mock เป็น SWR/React Query เมื่อ backend พร้อม
- ผูกปุ่มกับ endpoint จริง (update profile, claims list, billing portal)
- ใส่ auth guard เมื่อระบบล็อกอินพร้อม
