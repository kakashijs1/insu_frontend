'use client'

import { 
  Building2,  // เพิ่ม icon ใหม่สำหรับ ตารางราคา
  Wrench      // เพิ่ม icon ใหม่สำหรับ ตารางราคา
} from 'lucide-react'
import { useState } from 'react'

// --- Data: Price List from Image (New Data) ---
const priceData = [
  { name: 'วิริยะประกันภัย', c1_mall: 17500, c1_garage: 17000, c2p_100: 7500, c2p_200: 8800, c3p_100: 6600, c3p_200: 7700, c3: null },
  { name: 'คุ้มภัยโตเกียวมารีน', c1_mall: 18500, c1_garage: 13500, c2p_100: 6500, c2p_200: 7100, c3p_100: 6000, c3p_200: 6600, c3: 2000 },
  { name: 'กรุงเทพประกันภัย', c1_mall: 17000, c1_garage: 13900, c2p_100: 6600, c2p_200: 7500, c3p_100: 6500, c3p_200: null, c3: 2300 },
  { name: 'เมืองไทยประกันภัย', c1_mall: 21486, c1_garage: 15500, c2p_100: 7200, c2p_200: 8000, c3p_100: 6400, c3p_200: 7000, c3: 1900 },
  { name: 'ธนชาตประกันภัย', c1_mall: 19000, c1_garage: 15000, c2p_100: 7999, c2p_200: 8600, c3p_100: null, c3p_200: 6800, c3: 2900 },
  { name: 'เออร์โกประกันภัย', c1_mall: 20000, c1_garage: 13400, c2p_100: 5695, c2p_200: 6446, c3p_100: 5264, c3p_200: 5695, c3: 2100 },
  { name: 'ทิพยประกันภัย', c1_mall: 25100, c1_garage: 13000, c2p_100: 7000, c2p_200: 7999, c3p_100: 5999, c3p_200: 7000, c3: 2500 },
  { name: 'ประกันภัยไทยวิวัฒน์', c1_mall: 22500, c1_garage: 14500, c2p_100: 7300, c2p_200: 8300, c3p_100: 6300, c3p_200: 7300, c3: 2580 },
  { name: 'ไทยเศรษฐกิจประกันภัย', c1_mall: null, c1_garage: 12551, c2p_100: 5700, c2p_200: 6700, c3p_100: 5199, c3p_200: 6199, c3: 1750 },
  { name: 'ชับบ์สามัคคีประกันภัย', c1_mall: 21500, c1_garage: 15700, c2p_100: 5800, c2p_200: 6801, c3p_100: 5301, c3p_200: 6300, c3: 2600 },
]

interface ActivePriceTabType {
  id: 'c1' | 'c2p' | 'c3p' | 'c3'
  label: string
}

const activePriceTabs:ActivePriceTabType[] =  [
  { id: 'c1', label: 'ประกันชั้น 1' },
  { id: 'c2p', label: 'ประกันชั้น 2+' },
  { id: 'c3p', label: 'ประกันชั้น 3+' },
  { id: 'c3', label: 'ประกันชั้น 3' },
]

export default function SectionTable() {
      // State for Price Table Tabs
  const [activePriceTab, setActivePriceTab] = useState<'c1' | 'c2p' | 'c3p' | 'c3'>('c1')

  const formatPrice = (price: number | null | undefined) => {
    if (!price) return '-'
    return price.toLocaleString('th-TH')
  }
  

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 text-center max-w-4xl">
          <h2 className="text-2xl font-bold text-primary sm:text-3xl">
            เช็คเบี้ยประกันภัย อัปเดตล่าสุด
          </h2>
          <p className="mt-3 text-text-medium">
            เปรียบเทียบราคาจากบริษัทประกันชั้นนำ แยกตามประเภทประกันที่คุณสนใจ
          </p>
        </div>

        {/* Tabs Controller */}
        <div className="mx-auto mb-8 flex max-w-4xl flex-wrap justify-center gap-2 sm:gap-4">
          {activePriceTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActivePriceTab(tab.id)}
              className={`rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-200 ${
                activePriceTab === tab.id
                  ? "bg-primary text-white shadow-lg shadow-primary/30 ring-2 ring-primary ring-offset-2 ring-offset-bg-light"
                  : "bg-white text-text-medium hover:bg-gray-50 hover:text-primary border border-border-light"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dynamic Table Card */}
        <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-black/5">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] border-collapse">
              <thead>
                <tr className="bg-bg-soft text-text-dark">
                  <th className="px-6 py-4 text-left text-sm font-bold w-[40%]">
                    บริษัทประกันภัย
                  </th>

                  {/* Dynamic Headers based on Tab */}
                  {activePriceTab === "c1" && (
                    <>
                      <th className="px-4 py-4 text-center text-sm font-bold text-primary">
                        <div className="flex flex-col items-center gap-1">
                          <Building2 className="h-5 w-5" />
                          <span>ซ่อมห้าง</span>
                        </div>
                      </th>
                      <th className="px-4 py-4 text-center text-sm font-bold text-secondary">
                        <div className="flex flex-col items-center gap-1">
                          <Wrench className="h-5 w-5" />
                          <span>ซ่อมอู่</span>
                        </div>
                      </th>
                    </>
                  )}

                  {(activePriceTab === "c2p" || activePriceTab === "c3p") && (
                    <>
                      <th className="px-4 py-4 text-center text-sm font-bold text-text-dark">
                        ทุน 100,000
                      </th>
                      <th className="px-4 py-4 text-center text-sm font-bold text-text-dark">
                        ทุน 200,000
                      </th>
                    </>
                  )}

                  {activePriceTab === "c3" && (
                    <th className="px-4 py-4 text-center text-sm font-bold text-text-dark">
                      ราคาเริ่มต้น
                    </th>
                  )}

                  <th className="px-4 py-4 text-center text-sm font-bold"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-light">
                {priceData.map((row, idx) => (
                  <tr
                    key={idx}
                    className="group hover:bg-bg-light/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        {/* Placeholder Logo circle (ใช้ตัวอักษรแรกแทนรูป logo) */}
                        <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-xs text-gray-400 font-bold border border-gray-200">
                          {row.name.charAt(0)}
                        </div>
                        <span className="text-sm font-semibold text-text-dark">
                          {row.name}
                        </span>
                      </div>
                    </td>

                    {/* Content Logic */}
                    {activePriceTab === "c1" && (
                      <>
                        <td className="px-4 py-4 text-center">
                          {row.c1_mall ? (
                            <span className="text-base font-bold text-primary">
                              {formatPrice(row.c1_mall)}
                            </span>
                          ) : (
                            <span className="text-gray-300">-</span>
                          )}
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className="text-base font-bold text-secondary">
                            {formatPrice(row.c1_garage)}
                          </span>
                        </td>
                      </>
                    )}

                    {activePriceTab === "c2p" && (
                      <>
                        <td className="px-4 py-4 text-center">
                          <span className="text-base font-bold text-text-dark">
                            {formatPrice(row.c2p_100)}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-center">
                          <span className="text-base font-bold text-text-dark">
                            {formatPrice(row.c2p_200)}
                          </span>
                        </td>
                      </>
                    )}

                    {activePriceTab === "c3p" && (
                      <>
                        <td className="px-4 py-4 text-center">
                          {row.c3p_100 ? (
                            <span className="text-base font-bold text-text-dark">
                              {formatPrice(row.c3p_100)}
                            </span>
                          ) : (
                            <span className="text-gray-300">-</span>
                          )}
                        </td>
                        <td className="px-4 py-4 text-center">
                          {row.c3p_200 ? (
                            <span className="text-base font-bold text-text-dark">
                              {formatPrice(row.c3p_200)}
                            </span>
                          ) : (
                            <span className="text-gray-300">-</span>
                          )}
                        </td>
                      </>
                    )}

                    {activePriceTab === "c3" && (
                      <td className="px-4 py-4 text-center">
                        {row.c3 ? (
                          <span className="text-base font-bold text-primary">
                            {formatPrice(row.c3)}
                          </span>
                        ) : (
                          <span className="text-gray-300">-</span>
                        )}
                      </td>
                    )}

                    <td className="px-4 py-4 text-center">
                      <button className="rounded-lg border border-primary px-3 py-1.5 text-xs font-bold text-primary transition hover:bg-primary hover:text-white">
                        เลือก
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-bg-soft/30 px-6 py-3 text-xs text-text-medium border-t border-border-light text-center sm:text-right">
            * ราคาเบี้ยประกันภัยอาจมีการเปลี่ยนแปลงตามโปรโมชั่นของแต่ละบริษัท
          </div>
        </div>
      </div>
    </>
  );
}
