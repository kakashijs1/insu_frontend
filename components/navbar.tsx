"use client"

import { Globe2, Menu, Phone, Search, X, Shield, Clock, CreditCard, HelpCircle, ChevronDown, User } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'

const mainLinks = [
  { href: '#products', label: 'ผลิตภัณฑ์', icon: Shield },
]

const quickLinks = [
  { href: '#track', label: 'ติดตามสถานะ', icon: Clock },
  { href: '#pay', label: 'ชำระเบี้ย', icon: CreditCard },
  { href: '#help', label: 'ช่วยเหลือ', icon: HelpCircle },
]

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  return (
    <header className='navbar-shell'>
      {/* Top Bar - Info Strip (Desktop only) */}
      <div className='hidden border-b border-border-light/40 bg-linear-to-r from-primary/5 via-white to-secondary/5 lg:block'>
        <div className='mx-auto flex h-11 container items-center justify-between px-5 sm:px-8 lg:px-10'>
          <div className='flex items-center gap-3 text-xs text-text-medium'>
            <span className='flex items-center gap-2 rounded-full border border-border-light/70 bg-white/80 px-3 py-1 font-semibold uppercase tracking-[0.18em] text-primary shadow-sm'>
              <Clock className='h-3.5 w-3.5' />
              24/7
            </span>
            <a href='tel:020000000' className='flex items-center gap-1.5 rounded-full px-3 py-1 text-text-medium transition hover:bg-white hover:text-primary'>
              <Phone className='h-3.5 w-3.5' />
              <span className='font-medium'>โทรฉุกเฉิน: 02-000-0000</span>
            </a>
            <span className='hidden h-2 w-1px bg-border-light sm:inline-block' aria-hidden />
            <span className='hidden rounded-full bg-white/80 px-3 py-1 text-[0.7rem] font-semibold text-text-medium shadow-sm sm:inline'>บริการ 24 ชั่วโมง</span>
          </div>
          <div className='flex items-center gap-2 rounded-full border border-border-light/70 bg-white/80 px-2 py-1 shadow-sm'>
            {quickLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className='flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.7rem] font-semibold text-text-dark transition hover:bg-bg-soft hover:text-primary'
              >
                <item.icon className='h-3.5 w-3.5' />
                <span>{item.label}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className='navbar-container relative'>
        <div
          aria-hidden
          className='pointer-events-none absolute left-1/2 top-2 hidden h-16 w-[82%] -translate-x-1/2 rounded-full bg-linear-to-r from-primary/12 via-white to-secondary/12 blur-lg lg:block'
        />
        {/* Logo */}
        <a href='/' className='relative z-10 flex shrink-0 items-center'>
          <div className='flex items-center gap-2.5'>
            <div className='flex h-11 w-11 items-center justify-center rounded-xl bg-linear-to-br from-primary to-secondary shadow-md'>
              <Shield className='h-6 w-6 text-white' />
            </div>
            <div className='flex flex-col'>
              <span className='text-xl font-bold leading-tight text-primary'>INSU</span>
              <span className='text-[0.7rem] font-medium leading-tight text-text-medium'>ประกันรถยนต์</span>
            </div>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className='relative hidden flex-1 lg:flex  '>
          <div className='flex items-center gap-1 rounded-full border border-border-light/70 bg-white/90 px-2 py-1 shadow-[0_14px_50px_rgba(0,80,160,0.08)] backdrop-blur'>
            {mainLinks.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className='group relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-text-dark/85 transition-all duration-200 hover:-translate-y-0.5 hover:bg-linear-to-r hover:from-primary/5 hover:to-secondary/5 hover:text-primary after:absolute after:inset-x-4 after:-bottom-1.5 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-linear-to-r after:from-primary after:to-secondary after:transition-transform after:duration-200 after:content-[\"\"] group-hover:after:scale-x-100'
              >
                <item.icon className='h-4 w-4 opacity-70 transition-opacity duration-200 group-hover:opacity-100' />
                {item.label}
              </a>
            ))}
          </div>
        </nav>

        {/* Desktop Right Actions */}
        <div className='ml-auto hidden items-center gap-3 lg:flex'>
          <div className='flex items-center gap-2 rounded-full border border-border-light/70 bg-white/90 px-2 py-1.5 shadow-[0_14px_50px_rgba(0,80,160,0.08)] backdrop-blur'>
            <button
              type='button'
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className='nav-icon-btn h-10 w-10'
              aria-label='ค้นหา'
            >
              <Search className='h-5 w-5' />
            </button>
            <span className='hidden h-6 w-px bg-border-light/70 lg:inline' aria-hidden />
            
            <a
              href='/sign-in'
              className='rounded-full px-3 py-2 text-sm font-semibold text-secondary transition hover:bg-bg-soft hover:text-primary'
            >
              เข้าสู่ระบบ
            </a>
                  <span className='hidden h-6 w-px bg-border-light/70 lg:inline' aria-hidden />
            <a
              href='/sign-up'
              className='rounded-full bg-bg-soft px-3 py-2 text-sm font-semibold text-secondary transition hover:bg-primary hover:text-white'
            >
              สมัครสมาชิก
            </a>
                  <span className='hidden h-6 w-px bg-border-light/70 lg:inline' aria-hidden />
          </div>

          {/* Primary CTA */}
          <a href='#quote' className='nav-cta-primary shadow-[0_16px_45px_rgba(0,80,160,0.15)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_20px_60px_rgba(0,80,160,0.2)]'>
            <Shield className='h-4 w-4' />
            ติดต่อ
          </a>
        </div>

        {/* Tablet & Mobile Right Actions */}
        <div className='ml-auto flex items-center gap-2.5 lg:hidden'>
          {/* Search (Tablet) */}
          <button
            type='button'
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className='nav-icon-btn hidden md:flex'
            aria-label='ค้นหา'
          >
            <Search className='h-5 w-5' />
          </button>

          {/* CTA Button (Mobile & Tablet) */}
          <Link href='#quote' className='flex h-10 items-center justify-center gap-2 rounded-2xl bg-primary px-4 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-secondary'>
            <Shield className='h-3.5 w-3.5' />
            <span className='hidden sm:inline'>ใบเสนอราคา</span>
          </Link>

          {/* Menu Toggle */}
          <button
            type='button'
            className='nav-icon-btn'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label='เมนู'
          >
            {isMenuOpen ? <X className='h-5 w-5' /> : <Menu className='h-5 w-5' />}
          </button>
        </div>
      </div>

      {/* Search Bar (Slide Down) */}
      {isSearchOpen && (
        <div className='border-t border-border-light/70 bg-white/95 px-4 py-4 shadow-[0_18px_60px_rgba(0,80,160,0.12)] backdrop-blur sm:px-6 lg:px-10'>
          <div className='mx-auto max-w-3xl'>
            <div className='input-wrapper'>
              <Search className='input-icon h-5 w-5' />
              <input
                type='text'
                placeholder='ค้นหาผลิตภัณฑ์, บทความ, หรือข้อมูลที่ต้องการ...'
                className='text-input'
                autoFocus
              />
            </div>
            <div className='mt-3 flex flex-wrap gap-2'>
              <span className='text-xs font-medium text-text-medium'>คำค้นหายอดนิยม:</span>
              {['ประกันชั้น 1', 'เคลมออนไลน์', 'ต่อประกัน', 'ประกันรถใหม่'].map((term) => (
                <button
                  key={term}
                  className='rounded-full bg-bg-soft px-3 py-1 text-xs font-medium text-text-dark transition hover:bg-primary hover:text-white'
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile & Tablet Menu Drawer */}
      {isMenuOpen && (
        <div className='lg:hidden'>
          <div className='nav-drawer'>
            {/* Main Links */}
            <div className='space-y-1'>
              {mainLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className='flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold text-text-dark transition-colors hover:bg-bg-soft hover:text-primary'
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className='h-5 w-5' />
                  {item.label}
                </a>
              ))}
            </div>

            {/* Quick Links Section */}
            <div className='mt-4 rounded-xl bg-bg-soft/70 p-3'>
              <h3 className='mb-2 px-2 text-xs font-bold uppercase tracking-wider text-text-medium'>
                บริการด่วน
              </h3>
              <div className='space-y-1'>
                {quickLinks.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className='flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-text-dark transition-colors hover:bg-white'
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <item.icon className='h-4 w-4' />
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            {/* User Actions */}
            <div className='mt-4 space-y-2'>
              <a
                href='/sign-in'
                className='flex items-center justify-center gap-2 rounded-xl border border-border-light bg-white px-4 py-3 text-sm font-semibold text-secondary transition-colors hover:border-primary hover:text-primary'
              >
                <User className='h-4 w-4' />
                เข้าสู่ระบบ
              </a>
              <a
                href='/sign-up'
                className='flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-primary to-secondary px-4 py-3 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg'
              >
                สมัครสมาชิก
              </a>
            </div>

            {/* Bottom Utilities */}
            <div className='mt-4 flex items-center justify-between border-t border-border-light pt-4'>
              <button
                type='button'
                className='flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-text-dark transition hover:bg-bg-soft'
              >
                <Globe2 className='h-4 w-4' />
                TH/EN
              </button>
              <a
                href='tel:020000000'
                className='flex items-center gap-2 rounded-lg bg-accent-red px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-accent-red/90'
              >
                <Phone className='h-4 w-4' />
                โทรฉุกเฉิน
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
  
