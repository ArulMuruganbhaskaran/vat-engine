import DarkModeToggle from './components/DarkModeToggle';
import VatForm from './components/VatForm';
import VatResult from './components/VatResult';
import ErrorDisplay from './components/ErrorDisplay';
import { useVatCalculation } from './hooks/useVatCalculation';

export default function App() {
    const { result, error, loading, calculate, reset } = useVatCalculation();

    return (
        <div className="min-h-screen bg-mesh transition-colors duration-500 relative overflow-hidden">
            {/* Floating Orbs */}
            <div className="orb orb-1" />
            <div className="orb orb-2" />
            <div className="orb orb-3" />

            {/* ─── Header ─── */}
            <header className="sticky top-0 z-50 glass-card border-b border-white/20 dark:border-slate-700/30">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3.5">
                        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-brand-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-brand-500/30 pulse-glow">
                            <span className="text-white font-extrabold text-sm tracking-tight">VAT</span>
                        </div>
                        <div>
                            <h1 className="text-lg font-bold text-slate-900 dark:text-white leading-tight tracking-tight">
                                VAT Engine
                            </h1>
                            <p className="text-[11px] font-medium text-brand-500 dark:text-brand-400 uppercase tracking-widest">
                                UK & EU Digital Products
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-slate-400 dark:text-slate-500">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            API Connected
                        </div>
                        <DarkModeToggle />
                    </div>
                </div>
            </header>

            {/* ─── Main Content ─── */}
            <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
                {/* Hero */}
                <div className="text-center mb-12 sm:mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 dark:bg-brand-950/50 border border-brand-200 dark:border-brand-800/50 text-brand-600 dark:text-brand-400 text-xs font-semibold mb-5 tracking-wide">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        REGULATORY COMPLIANT
                    </div>
                    <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold gradient-text mb-4 leading-tight">
                        VAT Calculator
                    </h2>
                    <p className="text-base sm:text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
                        Instantly calculate VAT for digital product sales across the
                        <span className="font-semibold text-slate-700 dark:text-slate-300"> United Kingdom </span>
                        and
                        <span className="font-semibold text-slate-700 dark:text-slate-300"> European Union</span>.
                    </p>
                </div>

                {/* Two-Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
                    {/* Left: Form (3 cols) */}
                    <div className="lg:col-span-3">
                        <div className="glass-card rounded-3xl p-7 sm:p-9 shimmer-border">
                            <div className="flex items-center gap-3 mb-7">
                                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 tracking-tight">
                                        Transaction Details
                                    </h3>
                                    <p className="text-[11px] text-slate-400 dark:text-slate-500">
                                        Enter your transaction to calculate VAT
                                    </p>
                                </div>
                            </div>
                            <VatForm
                                onCalculate={calculate}
                                loading={loading}
                                onReset={reset}
                            />
                        </div>
                    </div>

                    {/* Right: Result (2 cols) */}
                    <div className="lg:col-span-2 space-y-5">
                        {error && <ErrorDisplay message={error} />}
                        {result && <VatResult data={result} />}

                        {/* Empty State */}
                        {!result && !error && (
                            <div className="glass-card rounded-3xl p-8 sm:p-10 text-center shimmer-border">
                                <div className="w-20 h-20 mx-auto mb-5 rounded-3xl bg-gradient-to-br from-brand-100 via-purple-100 to-pink-100 dark:from-brand-900/30 dark:via-purple-900/30 dark:to-pink-900/30 flex items-center justify-center">
                                    <svg className="w-10 h-10 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-2">
                                    Ready to Calculate
                                </h3>
                                <p className="text-sm text-slate-400 dark:text-slate-500 leading-relaxed max-w-xs mx-auto">
                                    Enter a net price and select a country to see the VAT breakdown instantly.
                                </p>
                                <div className="flex justify-center gap-3 mt-6">
                                    {['🇬🇧', '🇩🇪', '🇫🇷', '🇮🇹', '🇪🇸', '🇳🇱'].map((flag, i) => (
                                        <span key={i} className="text-xl opacity-40 hover:opacity-100 transition-opacity duration-200 cursor-default">
                                            {flag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Feature Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-16">
                    {[
                        {
                            icon: (
                                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                                </svg>
                            ),
                            title: 'UK VAT — 20%',
                            desc: 'Standard rate applied to all digital product sales to UK customers. Domestic B2B included.',
                            gradient: 'from-blue-500/10 to-cyan-500/10 dark:from-blue-500/5 dark:to-cyan-500/5'
                        },
                        {
                            icon: (
                                <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                                </svg>
                            ),
                            title: 'EU Reverse Charge',
                            desc: 'B2B sales with valid VAT ID qualify for 0% VAT under the reverse charge mechanism.',
                            gradient: 'from-purple-500/10 to-pink-500/10 dark:from-purple-500/5 dark:to-pink-500/5'
                        },
                        {
                            icon: (
                                <svg className="w-6 h-6 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            ),
                            title: 'Smart Validation',
                            desc: 'Automated VAT ID format checks, country mismatch detection, and regulatory reasoning.',
                            gradient: 'from-emerald-500/10 to-teal-500/10 dark:from-emerald-500/5 dark:to-teal-500/5'
                        },
                    ].map((card) => (
                        <div
                            key={card.title}
                            className={`glass-card glass-card-hover rounded-2xl p-6 bg-gradient-to-br ${card.gradient}`}
                        >
                            <div className="w-12 h-12 rounded-2xl bg-white/80 dark:bg-slate-800/80 flex items-center justify-center mb-4 shadow-sm">
                                {card.icon}
                            </div>
                            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                                {card.title}
                            </h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                                {card.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </main>

            {/* ─── Footer ─── */}
            <footer className="relative z-10 border-t border-white/20 dark:border-slate-800/50 mt-8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-center">
                    <p className="text-xs text-slate-400 dark:text-slate-500">
                        VAT Engine v0.1.0
                    </p>
                </div>
            </footer>
        </div>
    );
}
