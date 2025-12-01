import { 
  Tag,        // เพิ่ม icon ใหม่
  Timer,      // เพิ่ม icon ใหม่
  Files,      // เพิ่ม icon ใหม่
  CreditCard, // เพิ่ม icon ใหม่
  Headset,    // เพิ่ม icon ใหม่
  Lock,       // เพิ่ม icon ใหม่
} from 'lucide-react';

    // --- Data: Why Choose Us (Section 1 - New) ---
const features = [
  {
    icon: Tag,
    title: 'สิทธิประโยชน์สุดคุ้ม',
    desc: 'รับข้อเสนอและส่วนลดพิเศษเฉพาะลูกค้าออนไลน์ของ INSU เท่านั้น',
  },
  {
    icon: Timer,
    title: 'เช็คเบี้ยไวใน 30 วิ',
    desc: 'เปรียบเทียบแผนประกันภัยจากบริษัทชั้นนำได้ง่ายๆ รู้ผลทันที',
  },
  {
    icon: Files,
    title: 'รวมครบทุกบริษัท',
    desc: 'คัดสรรผลิตภัณฑ์ประกันภัยจาก 30+ บริษัทประกันชั้นนำในไทย',
  },
  {
    icon: CreditCard,
    title: 'ผ่อนชำระสบายๆ',
    desc: 'เลือกผ่อน 0% นานสูงสุด 10 เดือน ได้ทั้งบัตรเครดิตและเงินสด',
  },
  {
    icon: Headset,
    title: 'ช่วยเหลือฉุกเฉิน 24 ชม.',
    desc: 'อุ่นใจทุกการเดินทาง มีทีมผู้เชี่ยวชาญคอยดูแลตลอด 24 ชั่วโมง',
  },
  {
    icon: Lock,
    title: 'ข้อมูลปลอดภัย 100%',
    desc: 'ระบบความปลอดภัยมาตรฐานสากล ได้รับความไว้วางใจจาก คปภ.',
  },
]

export default function SectionOne() {


    return (

        <>
         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 text-center">
            <h2 className="text-2xl font-bold text-primary sm:text-3xl">
              ทำไมต้องเลือกประกันภัยกับ สบายใจประกันภัย
            </h2>
            <div className="mx-auto mt-2 h-1 w-16 rounded-full bg-secondary/30"></div>
          </div>
          
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((item, idx) => (
              <div key={idx} className="flex gap-4 group">
                {/* Icon Box */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-bg-soft text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-white">
                  <item.icon className="h-6 w-6" />
                </div>
                {/* Text Content */}
                <div>
                  <h3 className="mb-1 text-base font-bold text-text-dark group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-medium">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        </>
    )
}