import ProfilePage from '@/components/profile/profile-page'

const profile = {
  fullName: 'Arthit Suksawat',
  memberId: 'INSU-2048-7711',
  email: 'arthit@insu.co',
  phone: '+66 80 000 0000',
  language: 'English / ไทย',
  lastLogin: '02 Dec 2025, 14:25',
  status: 'verified' as const,
}

const policies = [
  {
    id: 'COV-1024',
    product: 'Comprehensive Auto',
    tier: 'Class 1 - Premium',
    premium: 17500,
    currency: 'THB ',
    nextBilling: '15 Dec 2025',
    renewal: '15 Dec 2026',
    status: 'active' as const,
  },
  {
    id: 'GAR-2048',
    product: 'Garage & Fleet',
    tier: 'Garage Plan',
    premium: 9800,
    currency: 'THB ',
    nextBilling: '22 Dec 2025',
    renewal: '22 Dec 2026',
    status: 'pending' as const,
  },
]

const claims = [
  {
    id: 'CLM-55021',
    incidentDate: '08 Nov 2025',
    status: 'in_review' as const,
    amount: 32000,
    currency: 'THB ',
    lastUpdate: '01 Dec 2025',
  },
  {
    id: 'CLM-54888',
    incidentDate: '12 Oct 2025',
    status: 'approved' as const,
    amount: 18500,
    currency: 'THB ',
    lastUpdate: '18 Oct 2025',
  },
]

const payment = {
  brand: 'Visa',
  last4: '8241',
  exp: '08/27',
  autopay: true,
  billingAddress: '17/F, Sathorn Rd, Bangkok 10120',
}

const security = {
  mfaEnabled: true,
  lastPasswordChange: '18 Nov 2025',
  devices: ['MacOS · Bangkok', 'iPhone · Bangkok', 'Chrome · Last used 2h ago'],
  comms: { email: true, sms: false },
}

const support = [
  { label: 'Call center: 02-000-0000', href: 'tel:020000000' },
  { label: 'Email: support@insu.co', href: 'mailto:support@insu.co' },
  { label: 'Live chat (coming soon)', href: '#chat' },
]

const documents = [
  { label: 'Policy wording (EN)', href: '#policy-en' },
  { label: 'Terms & Conditions', href: '#terms' },
  { label: 'Privacy Notice', href: '#privacy' },
]

export default function ProfilePageRoute() {
  return (
    <main className="bg-bg-light pb-16">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 pt-10">
        <ProfilePage
          profile={profile}
          policies={policies}
          claims={claims}
          payment={payment}
          security={security}
          support={support}
          documents={documents}
        />
      </div>
    </main>
  )
}
