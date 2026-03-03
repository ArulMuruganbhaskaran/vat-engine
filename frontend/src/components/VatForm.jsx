import { useState, useEffect } from 'react';

const COUNTRIES = [
    { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
    { code: 'DE', name: 'Germany', flag: '🇩🇪' },
    { code: 'FR', name: 'France', flag: '🇫🇷' },
    { code: 'IT', name: 'Italy', flag: '🇮🇹' },
    { code: 'ES', name: 'Spain', flag: '🇪🇸' },
    { code: 'NL', name: 'Netherlands', flag: '🇳🇱' },
    { code: 'BE', name: 'Belgium', flag: '🇧🇪' },
    { code: 'AT', name: 'Austria', flag: '🇦🇹' },
    { code: 'IE', name: 'Ireland', flag: '🇮🇪' },
    { code: 'PL', name: 'Poland', flag: '🇵🇱' },
    { code: 'SE', name: 'Sweden', flag: '🇸🇪' },
    { code: 'EU', name: 'Europe', flag: '🇪🇺' },
];

export default function VatForm({ onCalculate, loading, onReset }) {
    const [netPrice, setNetPrice] = useState('');
    const [countryCode, setCountryCode] = useState('GB');
    const [vatId, setVatId] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (errors.netPrice && netPrice) setErrors((e) => ({ ...e, netPrice: null }));
    }, [netPrice]);

    function validate() {
        const newErrors = {};
        const price = parseFloat(netPrice);
        if (!netPrice || isNaN(price)) {
            newErrors.netPrice = 'Please enter a valid net price.';
        } else if (price <= 0) {
            newErrors.netPrice = 'Net price must be greater than zero.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!validate()) return;
        onCalculate({ netPrice, countryCode, vatId });
    }

    function handleReset() {
        setNetPrice('');
        setCountryCode('GB');
        setVatId('');
        setErrors({});
        onReset?.();
    }

    const selectedCountry = COUNTRIES.find((c) => c.code === countryCode);

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Net Price */}
            <div>
                <label htmlFor="netPrice" className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
                    Net Price
                </label>
                <div className="relative group">
                    <span className="absolute left-4.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 font-semibold text-lg pointer-events-none pl-0.5">
                        £
                    </span>
                    <input
                        id="netPrice"
                        type="number"
                        step="0.01"
                        min="0.01"
                        value={netPrice}
                        onChange={(e) => setNetPrice(e.target.value)}
                        placeholder="0.00"
                        className={`
              w-full pl-10 pr-4 py-4 rounded-2xl border-2 text-lg font-semibold
              bg-white/80 dark:bg-slate-800/40
              text-slate-900 dark:text-white
              placeholder:text-slate-300 dark:placeholder:text-slate-600
              input-focus
              ${errors.netPrice
                                ? 'border-red-300 dark:border-red-700'
                                : 'border-slate-200 dark:border-slate-700 hover:border-brand-300 dark:hover:border-brand-700'
                            }
              transition-all duration-200
            `}
                    />
                </div>
                {errors.netPrice && (
                    <p className="mt-2 text-xs font-medium text-red-500 dark:text-red-400 flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.netPrice}
                    </p>
                )}
            </div>

            {/* Country */}
            <div>
                <label htmlFor="countryCode" className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
                    Country
                </label>
                <div className="relative group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl pointer-events-none">
                        {selectedCountry?.flag}
                    </span>
                    <select
                        id="countryCode"
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="
              w-full pl-12 pr-10 py-4 rounded-2xl border-2 text-base font-medium
              bg-white/80 dark:bg-slate-800/40
              text-slate-900 dark:text-white
              border-slate-200 dark:border-slate-700
              hover:border-brand-300 dark:hover:border-brand-700
              input-focus appearance-none cursor-pointer
              transition-all duration-200
            "
                    >
                        {COUNTRIES.map((c) => (
                            <option key={c.code} value={c.code}>
                                {c.flag} {c.name} ({c.code})
                            </option>
                        ))}
                    </select>
                    <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>

            {/* VAT ID */}
            <div>
                <label htmlFor="vatId" className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
                    VAT ID
                    <span className="ml-2 font-normal normal-case tracking-normal text-slate-400 dark:text-slate-500">(optional — B2B reverse charge)</span>
                </label>
                <input
                    id="vatId"
                    type="text"
                    value={vatId}
                    onChange={(e) => setVatId(e.target.value)}
                    placeholder={`e.g. ${countryCode}123456789`}
                    className="
            w-full px-4 py-4 rounded-2xl border-2 text-base font-medium
            bg-white/80 dark:bg-slate-800/40
            text-slate-900 dark:text-white
            placeholder:text-slate-300 dark:placeholder:text-slate-600
            border-slate-200 dark:border-slate-700
            hover:border-brand-300 dark:hover:border-brand-700
            input-focus
            transition-all duration-200
          "
                />
            </div>

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
                <button
                    type="submit"
                    disabled={loading}
                    className="
            flex-1 py-4 px-6 rounded-2xl font-bold text-white text-base
            bg-gradient-to-r from-brand-500 via-purple-500 to-brand-600
            hover:from-brand-600 hover:via-purple-600 hover:to-brand-700
            focus:ring-2 focus:ring-brand-400 focus:ring-offset-2 dark:focus:ring-offset-slate-900
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-300
            shadow-lg shadow-brand-500/25 hover:shadow-xl hover:shadow-brand-500/40
            active:scale-[0.98]
            btn-shine
          "
                >
                    {loading ? (
                        <span className="flex items-center justify-center gap-2.5">
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Calculating…
                        </span>
                    ) : (
                        <span className="flex items-center justify-center gap-2">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                            Calculate VAT
                        </span>
                    )}
                </button>

                <button
                    type="button"
                    onClick={handleReset}
                    className="
            px-6 py-4 rounded-2xl font-bold text-sm
            text-slate-500 dark:text-slate-400
            bg-slate-100/80 dark:bg-slate-800/50
            border-2 border-slate-200 dark:border-slate-700
            hover:bg-slate-200/80 dark:hover:bg-slate-700/50
            hover:border-slate-300 dark:hover:border-slate-600
            transition-all duration-200
            active:scale-[0.98]
          "
                >
                    Reset
                </button>
            </div>
        </form>
    );
}
