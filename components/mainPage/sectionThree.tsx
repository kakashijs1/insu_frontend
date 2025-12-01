const insuranceCards = [
  {
    id: 'type1',
    icon: '1',
    title: 'ประกันภัยรถยนต์ชั้น 1',
    desc: 'คุ้มครองครบที่สุด ทั้งรถเราและคู่กรณี ครอบคลุมชน หาย ไหม้ น้ำท่วม และค่ารักษาพยาบาล เหมาะกับรถใหม่หรือรถใช้งานประจำ',
  },
  {
    id: 'type2plus',
    icon: '2+',
    title: 'ประกันภัยรถยนต์ชั้น 2+',
    desc: 'คุ้มครองรถเราเมื่อชนกับยานพาหนะทางบก และคุ้มครองคู่กรณี รวมรถหาย ไฟไหม้ (ไม่รวมชนไม่มีคู่กรณี)',
  },
  {
    id: 'type3plus',
    icon: '3+',
    title: 'ประกันภัยรถยนต์ชั้น 3+',
    desc: 'คุ้มครองรถเรา เฉพาะกรณีรถชนรถ และคุ้มครองคู่กรณี ไม่คุ้มครองรถหาย/ไฟไหม้ เหมาะกับรถอายุหลายปี',
  },
  {
    id: 'type2',
    icon: '2',
    title: 'ประกันภัยรถยนต์ชั้น 2',
    desc: 'เน้นคุ้มครองคู่กรณี และกรณีรถเราสูญหาย/ไฟไหม้ ไม่คุ้มครองความเสียหายตัวรถเราเมื่อเกิดอุบัติเหตุ',
  },
  {
    id: 'type3',
    icon: '3',
    title: 'ประกันภัยรถยนต์ชั้น 3',
    desc: 'เน้นคุ้มครองคู่กรณีเท่านั้น ซ่อมเขาไม่ซ่อมเรา เหมาะกับรถเก่า หรือรถที่ขับน้อยมาก',
  },
  {
    id: 'ev',
    icon: 'EV',
    title: 'ประกันภัยรถยนต์ไฟฟ้า',
    desc: 'คุ้มครองเหมือนชั้น 1 แต่เพิ่มความคุ้มครองพิเศษ เช่น แบตเตอรี่ EV และสายชาร์จ',
  },
]

export default function SectionThree() { 
    return ( 
        <>
         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-primary sm:text-3xl">
              ประกันรถยนต์มีกี่ประเภท คุ้มครองอะไรบ้าง?
            </h2>
            <p className="mt-2 text-text-medium">เลือกแผนที่เหมาะกับการขับขี่ของคุณ</p>
          </div>

          <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {insuranceCards.map((card) => (
              <div key={card.id} className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-border-light transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:ring-primary/30">
                <div className="mb-4 flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-primary to-secondary text-lg font-bold text-white shadow-md">
                    {card.icon}
                  </div>
                  <h3 className="text-lg font-bold text-text-dark group-hover:text-primary">
                    {card.title}
                  </h3>
                </div>
                <p className="text-sm leading-relaxed text-text-medium">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
        </>
    )
}