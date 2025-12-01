import { 
  Check, 
  X, 
  Shield,  
  Car, 
  ArrowRight, 
  Flame, 
  Waves, 
  Clock, 
  Battery, 
  CarFront,
  Stethoscope,
  Heart,
  Scale,
} from 'lucide-react';
import Link from 'next/link';

const tableColumns = [
  { key: 'ev', label: 'รถไฟฟ้า EV', highlight: false },
  { key: 't1', label: 'ประกันชั้น 1', highlight: false },
  { key: 't2p', label: 'ประกันชั้น 2+', highlight: false },
  { key: 't2', label: 'ประกันชั้น 2', highlight: false },
  { key: 't3p', label: 'ประกันชั้น 3+', highlight: false },
  { key: 't3', label: 'ประกันชั้น 3', highlight: false },
]

type CellStatus = 'check' | 'cross' | 'warn' | 'dash'


const tableRows = [
  {
    label: 'ชนแบบมีคู่กรณี',
    icon: CarFront,
    values: { ev: 'check', t1: 'check', t2p: 'check', t2: 'cross', t3p: 'check', t3: 'cross' } as Record<string, CellStatus>,
  },
  {
    label: 'ชนแบบไม่มีคู่กรณี',
    icon: Car,
    values: { ev: 'check', t1: 'check', t2p: 'cross', t2: 'cross', t3p: 'cross', t3: 'cross' } as Record<string, CellStatus>,
  },
  {
    label: 'ไฟไหม้',
    icon: Flame,
    values: { ev: 'check', t1: 'check', t2p: 'check', t2: 'check', t3p: 'cross', t3: 'cross' } as Record<string, CellStatus>,
  },
  {
    label: 'รถหาย',
    icon: Car, 
    values: { ev: 'check', t1: 'check', t2p: 'check', t2: 'check', t3p: 'cross', t3: 'cross' } as Record<string, CellStatus>,
  },
  {
    label: 'ภัยธรรมชาติ',
    icon: Waves,
    values: { ev: 'check', t1: 'check', t2p: 'check', t2: 'cross', t3p: 'check', t3: 'cross' } as Record<string, CellStatus>,
  },
  {
    label: 'ช่วยเหลือ 24 ชม.',
    icon: Clock,
    values: { ev: 'check', t1: 'check', t2p: 'check', t2: 'cross', t3p: 'cross', t3: 'cross' } as Record<string, CellStatus>,
  },
  {
    label: 'แบตเตอรี่ ระบบไฟฟ้า*',
    icon: Battery,
    values: { ev: 'warn', t1: 'dash', t2p: 'dash', t2: 'dash', t3p: 'dash', t3: 'dash' } as Record<string, CellStatus>,
  },
]

const commonCoverages = [
  { text: 'คุ้มครองคู่กรณี และทรัพย์สินคู่กรณี', icon: Shield },
  { text: 'อุบัติเหตุ ค่ารักษาพยาบาลบุคคลที่สาม', icon: Stethoscope },
  { text: 'คุ้มครองชีวิตบุคคลที่สาม', icon: Heart },
  { text: 'คุ้มครองชีวิตผู้ขับขี่', icon: Heart },
  { text: 'ค่ารักษาพยาบาลตัวผู้ขับขี่', icon: Stethoscope },
  { text: 'การประกันตัวผู้ขับขี่', icon: Scale },
]

  const renderCellIcon = (status: CellStatus) => {
    switch (status) {
      case 'check':
        return <div className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-teal text-white"><Check className="h-4 w-4 stroke-3" /></div>
      case 'cross':
        return <div className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-red-400"><X className="h-4 w-4 stroke-3" /></div>
      case 'warn':
        return <div className="mx-auto flex h-6 w-6 items-center justify-center rounded-full bg-accent-amber text-white"><span className="text-sm font-bold">!</span></div>
      case 'dash':
        return <div className="mx-auto h-1 w-3 bg-border-light"></div>
      default:
        return null
    }
  }

export default function SectionFour() {
    return (
        <>
         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Table Container */}
          <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-border-light shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] border-collapse">
                {/* Header */}
                <thead>
                  <tr className="bg-primary text-white">
                    <th className="px-6 py-5 text-left text-sm font-semibold">ความคุ้มครอง</th>
                    {tableColumns.map((col) => (
                      <th key={col.key} className="px-2 py-5 text-center text-sm font-semibold">
                        {col.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                
                {/* Body */}
                <tbody className="divide-y divide-border-light bg-white">
                  {tableRows.map((row, idx) => (
                    <tr key={idx} className="transition-colors hover:bg-bg-light/50">
                      <td className="flex items-center gap-3 px-6 py-4 text-sm font-medium text-text-dark">
                        <row.icon className="h-5 w-5 text-secondary" />
                        {row.label}
                      </td>
                      {tableColumns.map((col) => (
                        <td key={`${idx}-${col.key}`} className="px-2 py-4 text-center">
                          {renderCellIcon(row.values[col.key])}
                        </td>
                      ))}
                    </tr>
                  ))}

                  {/* Footer Row (Buttons) */}
                  <tr className="bg-bg-light/30">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-primary font-semibold">
                        <span>ซื้อประกันรถยนต์</span>
                        <ArrowRight className="h-4 w-4 animate-pulse" />
                      </div>
                    </td>
                    {tableColumns.map((col) => (
                      <td key={`btn-${col.key}`} className="px-2 py-4 text-center">
                        <Link href={`/quote?type=${col.key}`}>
                          <button className="rounded-full bg-primary px-4 py-1.5 text-xs font-bold text-white transition hover:bg-secondary hover:shadow-md">
                            เช็คราคา
                          </button>
                        </Link>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Note */}
            <div className="border-t border-border-light bg-white px-6 py-3 text-xs text-text-medium">
              <span className="mr-1 inline-flex h-4 w-4 items-center justify-center rounded-full bg-accent-amber text-[10px] font-bold text-white">!</span>
              * ขึ้นอยู่กับเงื่อนไขของกรมธรรม์ที่ท่านเลือก
            </div>

            {/* Common Coverage Footer */}
            <div className="border-t border-border-light bg-bg-soft/30 px-6 py-8">
              <h4 className="mb-6 text-center text-sm font-bold text-primary">
                ความคุ้มครองอื่นๆ ครอบคลุมทุกชั้นประกัน
              </h4>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {commonCoverages.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3 rounded-full border border-teal/20 bg-white px-4 py-2.5 shadow-sm">
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal text-white">
                       <Check className="h-3 w-3 stroke-3" />
                    </div>
                    <span className="text-xs font-medium text-text-dark">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
        </>
    )
}