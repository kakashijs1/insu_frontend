import SectionOne from '@/components/mainPage/section1' 
import SectionSwiper from '@/components/mainPage/sectionSwiper'
import SectionThree from '@/components/mainPage/sectionThree'
import SectionFour from '@/components/mainPage/section4'
import SectionTable from '@/components/mainPage/sectionTable'

export default function MainPage() {


  return (
    <main className="min-h-screen bg-bg-light pb-20">

      {/* --- Section 1: Why Choose Us (New) --- */}
      <section className="bg-white py-12 shadow-sm border-b border-border-light/40">
         <SectionOne  />
      </section>
      
      {/* --- Section 2: Promotion (Moved Down) --- */}
      <section className="bg-white pb-12 pt-8 sm:pt-12">
       <SectionSwiper />
      </section>

      {/* --- Section 3: Insurance Type Cards --- */}
      <section className="py-16">
       <SectionThree />
      </section>

      {/* ========================================================= */}
      {/* NEW SECTION: PRICE COMPARISON TABLE (ตารางราคา)          */}
      {/* ========================================================= */}
      <section className="bg-bg-soft/50 py-16" id="price-table">
        <SectionTable />
      </section>
      
      {/* --- Section 4: Comparison Table --- */}
      <section className="bg-white py-16">
        <SectionFour />
      </section>
      
    </main>
  )
}