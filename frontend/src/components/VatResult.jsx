export default function VatResult({ data }) {
    if (!data) return null;

    const items = [
        {
            label: 'Net Price',
            value: `£${data.netPrice.toFixed(2)}`,
            icon: (
                <svg className="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            color: 'text-slate-700 dark:text-slate-200',
            bg: 'bg-slate-50 dark:bg-slate-800/50',
        },
        {
            label: 'VAT Rate',
            value: `${data.vatRate}%`,
            icon: (
                <svg className="w-4 h-4 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
            ),
            color: 'text-brand-600 dark:text-brand-400',
            bg: 'bg-brand-50 dark:bg-brand-950/30',
        },
        {
            label: 'VAT Amount',
            value: `£${data.vatAmount.toFixed(2)}`,
            icon: (
                <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
                </svg>
            ),
            color: 'text-amber-600 dark:text-amber-400',
            bg: 'bg-amber-50 dark:bg-amber-950/30',
        },
        {
            label: 'Total Price',
            value: `£${data.totalPrice.toFixed(2)}`,
            icon: (
                <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            color: 'text-emerald-600 dark:text-emerald-400',
            bg: 'bg-emerald-50 dark:bg-emerald-950/30',
        },
    ];

    return (
        <div className="result-reveal space-y-4">
            {/* Header */}
            <div className="flex items-center gap-2.5">
                <div className="w-1.5 h-6 rounded-full bg-gradient-to-b from-brand-500 to-purple-600" />
                <h2 className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400">
                    VAT Breakdown
                </h2>
            </div>

            {/* Cards */}
            <div className="space-y-3">
                {items.map((item, i) => (
                    <div
                        key={item.label}
                        className={`
              glass-card glass-card-hover rounded-2xl p-4 flex items-center justify-between
              ${item.bg}
            `}
                        style={{ animationDelay: `${i * 100}ms` }}
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-white/80 dark:bg-slate-700/60 flex items-center justify-center shadow-sm">
                                {item.icon}
                            </div>
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                {item.label}
                            </span>
                        </div>
                        <p className={`text-xl font-extrabold count-up stat-number ${item.color}`}>
                            {item.value}
                        </p>
                    </div>
                ))}
            </div>

            {/* VAT Reason */}
            <div className="glass-card rounded-2xl p-5 gradient-border mt-3">
                <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center shrink-0 shadow-md shadow-brand-500/20">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-brand-600 dark:text-brand-400 mb-1.5">
                            Regulatory Reason
                        </p>
                        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                            {data.vatReason}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
