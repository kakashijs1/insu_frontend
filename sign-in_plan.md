# แผนทำงานสำหรับหน้า Sign-in (Login)

- [x] **Step 1 — สร้างเพจและโครงร่าง**
  - เพิ่มไฟล์ `app/(main)/(auth)/sign-in/page.tsx` ใช้ layout เดิม (มี Navbar)
  - โครงหลักเป็นการ์ดฟอร์ม (พื้นหลังอ่อน/gradient ใกล้เคียงหน้า sign-up) รองรับ mobile/desktop

- [x] **Step 2 — ฟอร์มและอินพุตหลัก**
  - ช่องกรอก `เบอร์โทรศัพท์` (`tel`, `inputMode="tel"`) ใช้คลาส `input-wrapper`, `text-input`, ไอคอนโทรศัพท์
  - ช่อง `รหัสผ่าน` (`password`) ใช้คลาส `text-input`, ไอคอนแม่กุญแจ
  - ปุ่มหลัก "เข้าสู่ระบบ" ใช้สไตล์ `primary-btn` (disable เมื่อกรอกไม่ครบ)

- [x] **Step 3 — ลิงก์ลืมรหัสผ่าน**
  - เพิ่มลิงก์/ปุ่มข้อความ "ลืมรหัสผ่าน?" ใต้ช่องรหัสผ่าน ชี้ไป `/forgot-password` หรือ `#` เป็น placeholder
  - ใส่ note ว่ารอสร้างหน้า forgot password ภายหลัง

- [x] **Step 4 — ลอจิก client & validation เบื้องต้น**
  - ใช้ client component (`'use client'`)
  - state: `phone`, `password`, `formError`
  - ตรวจสอบก่อน submit: ต้องกรอกทั้งสองช่อง; หากไม่ครบให้ขึ้น error ภาษาไทย
  - เมื่อ submit สำเร็จแสดงข้อความ mock (รอเชื่อม API จริง)

- [x] **Step 5 — UX/ข้อความและสไตล์เสริม**
  - ใส่คำอธิบาย/heading ย่อหน้าให้สอดคล้อง tone หน้า sign-up
  - ใช้สีธีม (primary/secondary/teal) และ utility class เดิม (`input-label`, `input-icon`, ฯลฯ)
  - ปรับ spacing/padding ให้สวยงามทั้ง mobile/desktop

- [x] **Step 6 — ตรวจสอบหลังพัฒนา**
  - ทดสอบด้วยตนเองที่ `/sign-in` (focus/Enter/disable state)
  - รัน `npm run lint` และ `npm run build` หลังพัฒนาเสร็จ
