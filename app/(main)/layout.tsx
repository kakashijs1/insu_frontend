import Navbar from '@/components/navbar'

interface MainLayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <main className='px-4 py-6'>{children}</main>
    </div>
  )
}
