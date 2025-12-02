"use client"

import StatCard from './stat-card'

const stats = [
  { label: 'New Users (7d)', value: '248', change: '+12%', trend: 'up' as const },
  { label: 'Active Policies', value: '1,482', change: '+3%', trend: 'up' as const },
  { label: 'Open Claims', value: '56', change: '-5%', trend: 'down' as const },
  { label: 'Est. Premium (M)', value: '฿12.4', change: '+1.2%', trend: 'up' as const },
]

const activities = [
  { id: 'REQ-1042', user: 'S. Kittipan', action: 'Requested policy change', date: '02 Dec 2025', status: 'Pending' },
  { id: 'REQ-1041', user: 'N. Siriwat', action: 'New claim submitted', date: '02 Dec 2025', status: 'In review' },
  { id: 'REQ-1038', user: 'M. Wong', action: 'Payment received', date: '01 Dec 2025', status: 'Completed' },
]

const tasks = [
  { id: 'T-201', title: 'Approve claim CLM-55021', priority: 'High', due: 'Today' },
  { id: 'T-202', title: 'Verify documents for new fleet policy', priority: 'Medium', due: 'Tomorrow' },
  { id: 'T-203', title: 'Follow up KYC pending', priority: 'Low', due: 'This week' },
]

const health = [
  { service: 'API Gateway', status: 'Operational', updated: '2m ago' },
  { service: 'Payments', status: 'Degraded', updated: '5m ago' },
  { service: 'Notifications', status: 'Operational', updated: 'Just now' },
]

const statusColor = (status: string) => {
  if (status === 'Operational') return 'text-green-700 bg-green-100'
  if (status === 'Degraded') return 'text-amber-700 bg-amber-100'
  return 'text-red-700 bg-red-100'
}

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-text-dark">Admin Dashboard</h1>
        <p className="text-sm text-text-medium">Monitor users, policies, claims, and system health.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <StatCard key={item.label} label={item.label} value={item.value} change={item.change} trend={item.trend} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.3fr,0.7fr]">
        <div className="rounded-2xl border border-border-light bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-text-dark">Recent Activity</p>
              <p className="text-xs text-text-medium">Latest requests and actions</p>
            </div>
            <button
              type="button"
              className="text-sm font-semibold text-primary"
              onClick={() => console.log('View all activity')}
            >
              View all
            </button>
          </div>
          <div className="mt-3 divide-y divide-border-light/70">
            {activities.map((act) => (
              <div key={act.id} className="flex flex-wrap items-center gap-3 py-3">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-text-dark">{act.user}</p>
                  <p className="text-xs text-text-medium">{act.action}</p>
                </div>
                <p className="text-xs text-text-medium">{act.date}</p>
                <span className="rounded-full bg-bg-soft px-3 py-1 text-xs font-semibold text-text-dark">{act.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border-light bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-text-dark">Tasks / Approvals</p>
            <button
              type="button"
              className="text-sm font-semibold text-primary"
              onClick={() => console.log('Add task')}
            >
              Add
            </button>
          </div>
          <div className="mt-3 space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className="rounded-xl border border-border-light/70 bg-bg-soft px-3 py-2">
                <p className="text-sm font-semibold text-text-dark">{task.title}</p>
                <div className="mt-1 flex justify-between text-xs text-text-medium">
                  <span>{task.priority} priority</span>
                  <span>{task.due}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.6fr,1.4fr]">
        <div className="rounded-2xl border border-border-light bg-white p-4 shadow-sm">
          <p className="text-sm font-semibold text-text-dark">System Health</p>
          <p className="text-xs text-text-medium">Real-time service overview</p>
          <div className="mt-3 space-y-2">
            {health.map((h) => (
              <div key={h.service} className="flex items-center justify-between rounded-xl bg-bg-soft px-3 py-2 text-sm">
                <div>
                  <p className="font-semibold text-text-dark">{h.service}</p>
                  <p className="text-xs text-text-medium">Updated {h.updated}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor(h.status)}`}>{h.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-border-light bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-text-dark">Performance</p>
            <span className="text-xs text-text-medium">Placeholder chart</span>
          </div>
          <div className="mt-3 h-56 rounded-xl bg-bg-soft" />
          <div className="mt-3 flex items-center justify-between text-xs text-text-medium">
            <span>Conversion</span>
            <span>+4.3%</span>
          </div>
        </div>
      </div>
    </div>
  )
}
