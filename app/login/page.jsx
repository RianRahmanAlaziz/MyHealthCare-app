"use client";

import React from 'react'
import { useRouter } from "next/navigation";
import Login from '@/components/auth/Login'

export default function LoginPage() {
    const router = useRouter();

    const onNavigateToRegistration = () => {
        router.push("/registration");
    };

    return (
        <Login onNavigateToRegistration={onNavigateToRegistration} />
    )
}
