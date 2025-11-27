# แผนทำงานสำหรับ Flow ลืมรหัสผ่าน

- [x] **Step 1 — หน้าเริ่มต้นกรอกเบอร์โทร (`/forgot-password`)**
  - สร้างเพจใหม่ภายใต้ `app/(main)/(auth)/forgot-password/page.tsx`
  - ฟอร์มเบอร์โทร (`tel`, `inputMode="tel"`) ใช้คลาส `input-wrapper`, `text-input`, ไอคอนโทรศัพท์
  - ปุ่มหลัก “ส่งรหัส OTP” (`primary-btn`) ปิดใช้งานหากยังไม่กรอกเบอร์
  - onSubmit (mock): แสดงข้อความส่ง OTP แล้ว และ `router.push` ไปหน้า OTP พร้อมแนบ query เช่น `?phone=08...`

- [x] **Step 2 — หน้าใส่ OTP (`/forgot-password/otp`)**
  - สร้างเพจใหม่ `app/(main)/(auth)/forgot-password/otp/page.tsx`
  - ใช้ UI ช่อง OTP 6 หลักจาก sign-up (grid + auto focus) และ countdown/resend mock
  - แสดงเบอร์ที่ส่ง OTP ไป (อ่านจาก query string)
  - ปุ่มยืนยัน OTP ปิดใช้งานจนกรอกครบ 6 หลัก; mock success แล้ว `router.push('/forgot-password/reset?phone=...')`

- [x] **Step 3 — หน้าเปลี่ยนรหัสผ่านใหม่ (`/forgot-password/reset`)**
  - สร้างเพจใหม่ `app/(main)/(auth)/forgot-password/reset/page.tsx`
  - ฟอร์มมีช่อง “รหัสผ่านใหม่” และ “ยืนยันรหัสผ่านใหม่” ใช้ไอคอน Lock และ `text-input`
  - ตรวจสอบความครบและการยืนยันรหัสผ่านต้องตรงกัน; แสดง error ภาษาไทยหากไม่ตรง
  - onSubmit (mock): แสดงข้อความสำเร็จ แล้ว `router.push('/sign-in?reset=success')`

- [x] **Step 4 — UX/ข้อความและสไตล์**
  - รักษาโทน gradient/การ์ดแบบ sign-in/sign-up, ใช้สี primary/secondary/teal
  - ใส่ heading/คำอธิบายสั้น ๆ ในแต่ละหน้า และ helper text เช่น “กรุณากรอก OTP ภายใน xx วินาที”
  - ปรับ spacing และ responsive layout (mobile/desktop)

- [x] **Step 5 — ตรวจสอบและทดสอบ**
  - เดิน flow manual: sign-in → ลืมรหัสผ่าน → กรอกเบอร์ → OTP → reset → กลับหน้า sign-in
  - รัน `npm run lint` และ `npm run build` หลังพัฒนาเสร็จทุกหน้าของ flow
