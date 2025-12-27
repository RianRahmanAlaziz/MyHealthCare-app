"use client";

import { useRouter } from "next/navigation";
import ResearchConsent from '@/components/consent/ResearchConsent'
import { useEffect } from 'react'


export default function InformedConsentPage() {
    const router = useRouter();
    useEffect(() => {
        document.title = "Informed Consent | HealthCare Research";

    }, []);
    const onNavigateToRoleSelection = () => {
        router.push("/auth/login");
    };
    const onNavigateToLogin = () => {
        router.push("/");
    };
    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-teal-50 to-white">
            <ResearchConsent
                onNavigateToRoleSelection={onNavigateToRoleSelection}
                onNavigateToLogin={onNavigateToLogin}
            />
        </div>
    )
}
