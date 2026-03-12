export default function Badge({ children } : { children: React.ReactNode}) {
    return (
        <span className="inline-flex items-center rounded-lg border border-cyan-900/60 bg-cyan-950/40 px-2.5 py-1 text-xs font-semibold">
            {children}
        </span>
    )
}