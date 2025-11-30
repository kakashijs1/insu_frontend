'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { 
  Check, 
  X, 
  Shield, 
  Zap, 
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
  Tag,        // เพิ่ม icon ใหม่
  Timer,      // เพิ่ม icon ใหม่
  Files,      // เพิ่ม icon ใหม่
  CreditCard, // เพิ่ม icon ใหม่
  Headset,    // เพิ่ม icon ใหม่
  Lock,       // เพิ่ม icon ใหม่
  Building2,  // เพิ่ม icon ใหม่สำหรับ ตารางราคา
  Wrench      // เพิ่ม icon ใหม่สำหรับ ตารางราคา
} from 'lucide-react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

// --- Data: Promotion Banners (Slider) ---
const bannerSlides = [
  { src: '/promo/1.webp', alt: 'Promo banner 1' },
  { src: '/promo/2.webp', alt: 'Promo banner 2' },
  { src: '/promo/3.webp', alt: 'Promo banner 3' },
]

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

// --- Data: Insurance Type Cards (Section 3) ---
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

// --- Data: Comparison Table (Section 4) ---
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



export default function MainPage() {
  // State for Price Table Tabs
  const [activePriceTab, setActivePriceTab] = useState<'c1' | 'c2p' | 'c3p' | 'c3'>('c1')

  const formatPrice = (price: number | null | undefined) => {
    if (!price) return '-'
    return price.toLocaleString('th-TH')
  }
  
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

  return (
    <main className="min-h-screen bg-bg-light pb-20">

      {/* --- Section 1: Why Choose Us (New) --- */}
      <section className="bg-white py-12 shadow-sm border-b border-border-light/40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 text-center">
            <h2 className="text-2xl font-bold text-primary sm:text-3xl">
              ทำไมต้องเลือกประกันภัยกับ INSU
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
      </section>
      
      {/* --- Section 2: Promotion (Moved Down) --- */}
      <section className="bg-white pb-12 pt-8 sm:pt-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-8 max-w-4xl text-center">
             <h1 className="text-2xl font-bold text-primary sm:text-4xl">
               โปรโมชั่นประกันรถยนต์
             </h1>
          </div>
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl shadow-lg ring-1 ring-black/5">
            <Swiper
              modules={[Autoplay, Navigation, Pagination]}
              spaceBetween={0}
              slidesPerView={1}
              loop
              autoplay={{ delay: 4500, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              navigation
              className="promo-swiper"
            >
              {bannerSlides.map((slide, idx) => (
                <SwiperSlide key={slide.src}>
                  <div className="relative aspect-16/7 sm:aspect-16/6">
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      className="object-cover"
                      sizes="(min-width: 1024px) 960px, 100vw"
                      priority={idx === 0}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
           {/* Quick Stats */}
           <div className="mx-auto mt-8 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { icon: Zap, text: 'ผ่อน 0% นาน 10 เดือน', color: 'text-accent-amber' },
              { icon: Car, text: 'มีรถใช้ระหว่างซ่อม', color: 'text-secondary' },
              { icon: Shield, text: 'เคลมไว อู่ห้าง/อู่นอก', color: 'text-primary' },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-center gap-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-black/5 transition hover:shadow-md">
                <div className={`rounded-full bg-bg-soft p-2 ${item.color}`}>
                  <item.icon className="h-5 w-5" />
                </div>
                <span className="text-sm font-semibold text-text-dark">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Section 3: Insurance Type Cards --- */}
      <section className="py-16">
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
      </section>

      {/* ========================================================= */}
      {/* NEW SECTION: PRICE COMPARISON TABLE (ตารางราคา)          */}
      {/* ========================================================= */}
      <section className="bg-bg-soft/50 py-16" id="price-table">
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
                    ? 'bg-primary text-white shadow-lg shadow-primary/30 ring-2 ring-primary ring-offset-2 ring-offset-bg-light'
                    : 'bg-white text-text-medium hover:bg-gray-50 hover:text-primary border border-border-light'
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
                    <th className="px-6 py-4 text-left text-sm font-bold w-[40%]">บริษัทประกันภัย</th>
                    
                    {/* Dynamic Headers based on Tab */}
                    {activePriceTab === 'c1' && (
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

                    {(activePriceTab === 'c2p' || activePriceTab === 'c3p') && (
                      <>
                        <th className="px-4 py-4 text-center text-sm font-bold text-text-dark">
                           ทุน 100,000
                        </th>
                        <th className="px-4 py-4 text-center text-sm font-bold text-text-dark">
                           ทุน 200,000
                        </th>
                      </>
                    )}

                    {activePriceTab === 'c3' && (
                       <th className="px-4 py-4 text-center text-sm font-bold text-text-dark">
                         ราคาเริ่มต้น
                       </th>
                    )}

                    <th className="px-4 py-4 text-center text-sm font-bold"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-light">
                  {priceData.map((row, idx) => (
                    <tr key={idx} className="group hover:bg-bg-light/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {/* Placeholder Logo circle (ใช้ตัวอักษรแรกแทนรูป logo) */}
                          <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-xs text-gray-400 font-bold border border-gray-200">
                            {row.name.charAt(0)}
                          </div>
                          <span className="text-sm font-semibold text-text-dark">{row.name}</span>
                        </div>
                      </td>

                      {/* Content Logic */}
                      {activePriceTab === 'c1' && (
                        <>
                          <td className="px-4 py-4 text-center">
                            {row.c1_mall ? (
                              <span className="text-base font-bold text-primary">{formatPrice(row.c1_mall)}</span>
                            ) : <span className="text-gray-300">-</span>}
                          </td>
                          <td className="px-4 py-4 text-center">
                             <span className="text-base font-bold text-secondary">{formatPrice(row.c1_garage)}</span>
                          </td>
                        </>
                      )}

                      {activePriceTab === 'c2p' && (
                        <>
                          <td className="px-4 py-4 text-center">
                            <span className="text-base font-bold text-text-dark">{formatPrice(row.c2p_100)}</span>
                          </td>
                          <td className="px-4 py-4 text-center">
                            <span className="text-base font-bold text-text-dark">{formatPrice(row.c2p_200)}</span>
                          </td>
                        </>
                      )}

                       {activePriceTab === 'c3p' && (
                        <>
                          <td className="px-4 py-4 text-center">
                             {row.c3p_100 ? (
                               <span className="text-base font-bold text-text-dark">{formatPrice(row.c3p_100)}</span>
                             ) : <span className="text-gray-300">-</span>}
                          </td>
                          <td className="px-4 py-4 text-center">
                            {row.c3p_200 ? (
                               <span className="text-base font-bold text-text-dark">{formatPrice(row.c3p_200)}</span>
                             ) : <span className="text-gray-300">-</span>}
                          </td>
                        </>
                      )}

                      {activePriceTab === 'c3' && (
                        <td className="px-4 py-4 text-center">
                             {row.c3 ? (
                               <span className="text-base font-bold text-primary">{formatPrice(row.c3)}</span>
                             ) : <span className="text-gray-300">-</span>}
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
      </section>
      
      {/* --- Section 4: Comparison Table --- */}
      <section className="bg-white py-16">
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
      </section>
      
    </main>
  )
}