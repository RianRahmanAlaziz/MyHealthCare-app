export function DashboardCardSkeleton() {
    return (
        <div className="col-span-12 sm:col-span-6 xl:col-span-3 intro-y animate-pulse">
            <div className="report-box">
                <div className="box p-5">
                    {/* icon */}
                    <div className="w-8 h-8 rounded bg-slate-200" />

                    {/* number */}
                    <div className="h-8 w-70 bg-slate-200 rounded mt-6" />

                    {/* label */}
                    <div className="h-4 w-70 bg-slate-200 rounded mt-2" />
                </div>
            </div>
        </div>
    );
}
