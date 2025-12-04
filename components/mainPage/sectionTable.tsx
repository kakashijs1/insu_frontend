'use client'

import { 
  Building2, 
  Wrench,
  CheckCircle2,
  ShieldCheck,
  ChevronRight
} from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'

// --- Data: Price List ---
const priceData = [
  { name: 'วิริยะประกันภัย', c1_mall: 17500, c1_garage: 17000, c2p_100: 7500, c2p_200: 8800, c3p_100: 6600, c3p_200: 7700, c3: null },
  { name: 'เมืองไทยประกันภัย', c1_mall: 17000, c1_garage: 13900, c2p_100: 6600, c2p_200: 7500, c3p_100: 6500, c3p_200: null, c3: 2300 },
  { name: 'เออร์โกประกันภัย', c1_mall: 20000, c1_garage: 13400, c2p_100: 5695, c2p_200: 6446, c3p_100: 5264, c3p_200: 5695, c3: 2100 },
  { name: 'ไทยพัฒนา', c1_mall: 25100, c1_garage: 13000, c2p_100: 7000, c2p_200: 7999, c3p_100: 5999, c3p_200: 7000, c3: 2500 },
  { name: 'Allianz', c1_mall: 22100, c1_garage: 13000, c2p_100: 7000, c2p_200: 7999, c3p_100: 5999, c3p_200: 7000, c3: 2500 },
]

// --- Configuration: Logo Mapping ---
// แก้ชื่อไฟล์ให้ตรงกับใน Screenshot ของคุณ (public/logos)
const companyLogos: Record<string, string> = {
  'วิริยะประกันภัย': 'wiriya.jpg',    // ตามรูปของคุณเป็น .jpg
  'เมืองไทยประกันภัย': 'mt.jpg',  // (อันนี้ผมไม่เห็นในรูป ถ้าไม่มีให้หามาใส่ชื่อนี้นะครับ)
  'เออร์โกประกันภัย': 'ergo.png',     // ตามรูป
  'ไทยพัฒนา': 'thaipat.jpg',         // ตามรูป
  'Allianz': 'Ali.webp',             // ตามรูป (ตัว A ใหญ่)
}

interface ActivePriceTabType {
  id: 'c1' | 'c2p' | 'c3p' | 'c3'
  label: string
  desc: string
}

const activePriceTabs: ActivePriceTabType[] =  [
  { id: 'c1', label: 'ชั้น 1', desc: 'คุ้มครองครบ จบทุกภัย' },
  { id: 'c2p', label: 'ชั้น 2+', desc: 'คุ้มครองรถหาย/ไฟไหม้' },
  { id: 'c3p', label: 'ชั้น 3+', desc: 'ซ่อมเขา ซ่อมเรา' },
  { id: 'c3', label: 'ชั้น 3', desc: 'เน้นซ่อมคู่กรณี' },
]

export default function SectionTable() {
  const [activePriceTab, setActivePriceTab] = useState<'c1' | 'c2p' | 'c3p' | 'c3'>('c1')

  const formatPrice = (price: number | null | undefined) => {
    if (!price) return '-'
    return price.toLocaleString('th-TH')
  }

  // Helper to render logo
  const renderLogo = (companyName: string) => {
    // ดึงชื่อไฟล์จาก Mapping
    const logoFileName = companyLogos[companyName]

    return (
      <div className="h-10 w-10 sm:h-12 sm:w-12 shrink-0 overflow-hidden rounded-lg bg-white border border-gray-100 shadow-sm p-1 flex items-center justify-center">
        {logoFileName ? (
          /* กรณีมีชื่อไฟล์ใน Mapping ให้ดึงรูปจาก /logos/ */
          <Image 
            width={48}
            height={48}
            src={`/logos/${logoFileName}`} 
            alt={companyName}
            className="h-full w-full object-contain rounded-md"
            onError={(e) => {
              // ถ้าโหลดรูปไม่ขึ้น (เช่น พิมพ์ชื่อไฟล์ผิด) ให้ซ่อนรูปแล้วโชว์ตัวอักษรแทน
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement?.classList.add('fallback-mode');
            }}
          />
        ) : (
          /* Fallback: กรณีไม่ได้ใส่ Mapping ไว้ */
          <div className="flex h-full w-full items-center justify-center bg-gray-50 text-xs font-bold text-gray-400">
            {companyName.charAt(0)}
          </div>
        )}
      </div>
    )
  }

  return (
    <section className="relative overflow-hidden bg-bg-light py-16 sm:py-24">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mx-auto mb-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-4 h-4" />
            Price Update 2025
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-text-dark sm:text-4xl lg:text-5xl">
            เช็คเบี้ยประกันภัย <span className="text-primary">ราคาพิเศษ</span>
          </h2>
          <p className="mt-4 text-lg text-text-medium">
            เปรียบเทียบราคาชัดเจน จากบริษัทประกันชั้นนำกว่า 20 แห่ง<br className="hidden sm:block" />
            เลือกแผนที่ใช่ ในราคาที่คุณพอใจ
          </p>
        </div>

        {/* Tabs Controller */}
        <div className="mx-auto mb-8 w-full max-w-4xl">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1.5 bg-white rounded-2xl border border-border-light shadow-sm">
            {activePriceTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActivePriceTab(tab.id)}
                className={`relative flex flex-col items-center justify-center py-3 px-2 rounded-xl text-sm transition-all duration-300 ${
                  activePriceTab === tab.id
                    ? "bg-primary text-white shadow-md ring-1 ring-black/5"
                    : "text-text-medium hover:bg-gray-50 hover:text-primary"
                }`}
              >
                <span className="font-bold text-base leading-none mb-1">{tab.label}</span>
                <span className={`text-[10px] sm:text-xs ${activePriceTab === tab.id ? "text-white/90" : "text-gray-400"}`}>
                  {tab.desc}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Table Card */}
        <div className="mx-auto max-w-5xl">
          <div className="overflow-hidden rounded-2xl bg-white shadow-xl shadow-gray-200/50 border border-border-light/60">
            <div className="overflow-x-auto custom-scrollbar">
              <table className="w-full min-w-[700px] border-collapse">
                <thead className="sticky top-0 z-10">
                  <tr className="bg-bg-soft/80 backdrop-blur-md text-text-dark border-b border-border-light">
                    <th className="px-6 py-5 text-left text-sm font-bold w-[35%]">
                      บริษัทประกันภัย
                    </th>

                    {/* Dynamic Headers */}
                    {activePriceTab === "c1" && (
                      <>
                        <th className="px-4 py-5 text-center w-[25%]">
                          <div className="flex flex-col items-center gap-1.5 text-primary">
                            <div className="p-2 bg-white rounded-full shadow-sm">
                              <Building2 className="h-5 w-5" />
                            </div>
                            <span className="text-sm font-bold">ซ่อมห้าง</span>
                          </div>
                        </th>
                        <th className="px-4 py-5 text-center w-[25%]">
                          <div className="flex flex-col items-center gap-1.5 text-secondary">
                            <div className="p-2 bg-white rounded-full shadow-sm">
                              <Wrench className="h-5 w-5" />
                            </div>
                            <span className="text-sm font-bold">ซ่อมอู่</span>
                          </div>
                        </th>
                      </>
                    )}

                    {(activePriceTab === "c2p" || activePriceTab === "c3p") && (
                      <>
                        <th className="px-4 py-5 text-center text-sm font-bold text-text-dark w-[25%]">
                          <span className="block text-xs text-text-medium font-normal mb-1">ทุนประกัน</span>
                          100,000
                        </th>
                        <th className="px-4 py-5 text-center text-sm font-bold text-text-dark w-[25%]">
                          <span className="block text-xs text-text-medium font-normal mb-1">ทุนประกัน</span>
                          200,000
                        </th>
                      </>
                    )}

                    {activePriceTab === "c3" && (
                      <th className="px-4 py-5 text-center text-sm font-bold text-text-dark w-[50%]">
                        ราคาเริ่มต้น
                      </th>
                    )}

                    <th className="px-4 py-5 text-center w-[15%]"></th>
                  </tr>
                </thead>
                
                <tbody className="divide-y divide-border-light/60">
                  {priceData.map((row, idx) => (
                    <tr
                      key={idx}
                      className="group transition-colors hover:bg-blue-50/40"
                    >
                      {/* Logo & Name */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          {renderLogo(row.name)}
                          <div className="flex flex-col">
                            <span className="text-sm sm:text-base font-bold text-text-dark group-hover:text-primary transition-colors">
                              {row.name}
                            </span>
                            {(idx === 0 || idx === 3) && (
                              <span className="inline-flex w-fit items-center gap-1 rounded bg-green-100 px-1.5 py-0.5 text-[10px] font-medium text-green-700 mt-1">
                                <CheckCircle2 className="w-3 h-3" /> แนะนำ
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Prices */}
                      {activePriceTab === "c1" && (
                        <>
                          <td className="px-4 py-4 text-center">
                            {row.c1_mall ? (
                              <div className="flex flex-col items-center">
                                <span className="text-lg font-bold text-primary tabular-nums tracking-tight">
                                  {formatPrice(row.c1_mall)}
                                </span>
                                <span className="text-[10px] text-text-medium">บาท/ปี</span>
                              </div>
                            ) : (
                              <span className="text-gray-300 font-light">-</span>
                            )}
                          </td>
                          <td className="px-4 py-4 text-center">
                            <div className="flex flex-col items-center">
                              <span className="text-lg font-bold text-secondary tabular-nums tracking-tight">
                                {formatPrice(row.c1_garage)}
                              </span>
                              <span className="text-[10px] text-text-medium">บาท/ปี</span>
                            </div>
                          </td>
                        </>
                      )}

                      {activePriceTab === "c2p" && (
                        <>
                          <td className="px-4 py-4 text-center">
                            <span className="text-lg font-bold text-text-dark tabular-nums">
                              {formatPrice(row.c2p_100)}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-center">
                            <span className="text-lg font-bold text-text-dark tabular-nums">
                              {formatPrice(row.c2p_200)}
                            </span>
                          </td>
                        </>
                      )}

                      {activePriceTab === "c3p" && (
                        <>
                          <td className="px-4 py-4 text-center">
                            {row.c3p_100 ? (
                              <span className="text-lg font-bold text-text-dark tabular-nums">{formatPrice(row.c3p_100)}</span>
                            ) : <span className="text-gray-300">-</span>}
                          </td>
                          <td className="px-4 py-4 text-center">
                            {row.c3p_200 ? (
                              <span className="text-lg font-bold text-text-dark tabular-nums">{formatPrice(row.c3p_200)}</span>
                            ) : <span className="text-gray-300">-</span>}
                          </td>
                        </>
                      )}

                      {activePriceTab === "c3" && (
                        <td className="px-4 py-4 text-center">
                          {row.c3 ? (
                            <span className="text-xl font-bold text-primary tabular-nums">
                              {formatPrice(row.c3)}
                            </span>
                          ) : <span className="text-gray-300">-</span>}
                        </td>
                      )}

                      <td className="px-4 py-4 text-center">
                        <button className="group/btn relative overflow-hidden rounded-full bg-white border-2 border-primary/10 px-4 py-2 text-sm font-bold text-primary transition-all duration-200 hover:border-primary hover:bg-primary hover:text-white hover:shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5">
                          <span className="flex items-center gap-1">
                            เลือก
                            <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-text-medium border-t border-border-light">
              <span>* ราคาเบี้ยประกันภัยรวมภาษีและอากรแสตมป์แล้ว</span>
              <span>อัปเดตข้อมูลล่าสุด: 02/12/2025</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}