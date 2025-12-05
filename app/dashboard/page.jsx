'use client';
import { useEffect } from 'react';
export default function DashboardIndexPage() {
    useEffect(() => {
        document.title = "Dashboard | HealthCare Research";
    }, []);
    return (
        <>
            <h2 className="intro-y text-lg font-medium pt-8 sm:pt-24">
                HealthCare Research
            </h2>
        </>
    );
}
