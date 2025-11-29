"use client";
import { useRouter } from "next/navigation";
import ResearchConsent from '@/components/consent/ResearchConsent'
import React from 'react'



export default function ResearchConsentPage() {
    const router = useRouter();

    const onNavigateToRoleSelection = () => {
        router.push("/auth/role-selection");
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
