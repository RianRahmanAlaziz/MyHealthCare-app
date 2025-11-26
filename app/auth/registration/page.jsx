'use client'
import Registration from '@/components/auth/Registration'
import React from 'react'
import { useRouter } from "next/navigation";

export default function RegistrationPage() {
    const router = useRouter();

    const onNavigateToLogin = () => {
        router.push("/login");
    };
    return (
        <Registration onNavigateToLogin={onNavigateToLogin} />
    )
}
