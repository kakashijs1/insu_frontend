type StatCardProps = {
  label: string
  value: string
  change?: string
  trend?: 'up' | 'down' | 'flat'
}

export default function StatCard({ label, value, change, trend = 'flat' }: StatCardProps) {
  const trendColor =
    trend === 'up' ? 'text-green-600 bg-green-100' : trend === 'down' ? 'text-red-600 bg-red-100' : 'text-text-medium bg-bg-soft'

  return (
    <div className="rounded-2xl border border-border-light bg-white p-4 shadow-sm">
      <p className="text-sm font-semibold text-text-medium">{label}</p>
      <div className="mt-2 flex items-center justify-between">
        <p className="text-2xl font-bold text-text-dark">{value}</p>
        {change ? (
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${trendColor}`}>
            {change}
          </span>
        ) : null}
      </div>
    </div>
  )
}
