'use client'
import Registration from '@/components/auth/Registration'
import React from 'react'
import { useRouter } from "next/navigation";

export default function RegistrationPage() {
    const router = useRouter();

    const onNavigateToLogin = () => {
        router.push("/auth/login");
    };
    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-teal-50 to-white">
            <Registration onNavigateToLogin={onNavigateToLogin} />
        </div>

    )
}
