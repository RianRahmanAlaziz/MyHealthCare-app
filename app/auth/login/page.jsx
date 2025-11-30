"use client";

import React from 'react'
import { useRouter } from "next/navigation";
import Login from '@/components/auth/Login'

export default function LoginPage() {
    const router = useRouter();

    const onNavigateToRegistration = () => {
        router.push("/auth/registration");
    };
    const onNavigateToConsent = () => {
        router.push("/auth/role-selection");
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-teal-50 to-white">
            <Login onNavigateToRegistration={onNavigateToRegistration} onNavigateToConsent={onNavigateToConsent} />
        </div>
    )
}
