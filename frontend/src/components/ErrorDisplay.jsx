export default function ErrorDisplay({ message }) {
    if (!message) return null;

    return (
        <div className="result-reveal rounded-2xl p-5 bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-950/30 dark:to-rose-950/20 border border-red-200/60 dark:border-red-800/40">
            <div className="flex items-start gap-3.5">
                <div className="shrink-0 w-10 h-10 rounded-xl bg-red-100 dark:bg-red-900/40 flex items-center justify-center shadow-sm">
                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.834-1.964-.834-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                    </svg>
                </div>
                <div>
                    <p className="text-sm font-bold text-red-700 dark:text-red-400 mb-0.5">
                        Validation Error
                    </p>
                    <p className="text-sm text-red-600/80 dark:text-red-300/80 leading-relaxed">
                        {message}
                    </p>
                </div>
            </div>
        </div>
    );
}
