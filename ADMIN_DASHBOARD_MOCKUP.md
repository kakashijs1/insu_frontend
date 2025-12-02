# แผน Mockup ฝั่ง Admin (Frontend เท่านั้น)

วัตถุประสงค์: สร้าง UX/UI mock สำหรับผู้ดูแล (user admin) ประกอบด้วยหน้าเข้าสู่ระบบแยก และหน้า Dashboard พร้อม sidebar/navbar และเมนูหลัก เพื่อรองรับการเชื่อมต่อ backend/database ในอนาคต

## หน้าที่จะทำ
1) **หน้าเข้าสู่ระบบแอดมิน** (route แยก)
   - ฟอร์มอีเมล/รหัสผ่าน + Remember me
   - ปุ่ม Sign in (mock) + ลิงก์ Forgot password (stub)
   - แบนเนอร์/ข้อความเตือน “Authorized users only”

2) **หน้า Admin Dashboard (หลังล็อกอิน)**
   - Layout หลัก: Sidebar (เมนู), Top navbar (ค้นหา/โปรไฟล์), Content area
   - การ์ดสรุปสถิติ (mock data): ผู้ใช้ใหม่, กรมธรรม์, เคลม, รายได้ประเมิน
   - ตารางกิจกรรมล่าสุด/คำขอ (mock)
   - บล็อก placeholder สำหรับชาร์ต/กราฟ (ไว้ใส่ chart ภายหลัง)
   - ส่วน “Tasks / Approvals” (รายการสั้น ๆ)
   - ส่วน “System health / Status” (badge สี)

## โครงคอมโพเนนต์ที่ใช้
- `components/admin/AdminLayout.tsx` (layout shell: sidebar + topbar)
- `components/admin/AdminSidebar.tsx` (เมนู)
- `components/admin/AdminTopbar.tsx` (search, โปรไฟล์, แจ้งเตือน)
- `components/admin/AdminDashboard.tsx` (คอนเทนต์หลัก: cards, table, tasks, status)
- Shared: `StatCard`, `StatusBadge`, `SectionCard`

## เส้นทาง (Routes)
- `/admin/login` : หน้าเข้าสู่ระบบแอดมิน (mock)
- `/admin` : Dashboard หลัก (ใช้ AdminLayout ครอบ)

## Mock data (ตัวอย่าง)
- สถิติ: `{ label, value, changePct, trend }`
- คำขอ/กิจกรรม: `{ id, user, action, date, status }`
- งานค้าง: `{ id, title, priority, due }`
- สถานะระบบ: `{ service, status, updated }`

## การโต้ตอบ (ยังไม่ต่อ backend)
- ปุ่ม/ลิงก์ยิง `console.log` หรือ toast stub
- Toggle / select เป็น state ภายใน
- ส่วนชาร์ตใช้กล่อง placeholder (รอเชื่อม chart lib)

## แนวสไตล์
- ใช้โทนหลักของเว็บ: primary/secondary, bg-light/bg-soft, text-dark/text-medium
- Sidebar พื้นหลังขาว/เทาอ่อน, accent สี primary; active item มีแถบ/พื้นหลังไฮไลต์
- Cards: rounded-2xl, border-border-light, เงาอ่อน
- Badge สถานะ: green=operational, amber=degraded, red=down

## ขั้นตอนเมื่อจะต่อ backend
- ผูกฟอร์มล็อกอินกับ auth service / cookie / session
- ใช้ data fetching (SWR/React Query) กับ API จริง
- เพิ่ม role guard / route protection
- เปลี่ยน placeholder chart เป็น library จริง (เช่น chart.js/recharts)
