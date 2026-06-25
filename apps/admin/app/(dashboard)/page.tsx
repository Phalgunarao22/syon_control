export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-neutral-900">Dashboard</h1>
        <p className="text-neutral-500">Welcome to your admin control panel.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder Stat Cards */}
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-xl border border-neutral-200/60 bg-white p-6 shadow-[0_2px_10px_rgb(0,0,0,0.02)]">
            <div className="flex flex-row items-center justify-between pb-2">
              <h3 className="text-sm font-medium text-neutral-500">Total Revenue</h3>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-neutral-400"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
            <div className="text-2xl font-bold text-neutral-900">$45,231.89</div>
            <p className="text-xs text-emerald-600 mt-1 font-medium">+20.1% from last month</p>
          </div>
        ))}
      </div>
      
      <div className="rounded-xl border border-neutral-200/60 bg-white shadow-[0_2px_10px_rgb(0,0,0,0.02)] min-h-[400px] mt-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-neutral-500 mb-4">Detailed analytics component will go here</p>
        </div>
      </div>
    </div>
  )
}
