'use client'
import Image from 'next/image'
import { Autoplay, Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { 
  Shield, 
  Zap, 
  Car
} from 'lucide-react'


const bannerSlides = [
  { src: '/promo/1.webp', alt: 'Promo banner 1' },
  { src: '/promo/2.webp', alt: 'Promo banner 2' },
  { src: '/promo/3.webp', alt: 'Promo banner 3' },
]

export default function SectionSwiper() {
    return (
        <>
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
        </>
    )
}