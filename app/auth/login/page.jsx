"use client";

import React from 'react'
import { useEffect } from 'react';
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify' // ✅ Tambahkan ini
import 'react-toastify/dist/ReactToastify.css' // ✅ Import CSS
import Login from '@/components/auth/Login'
import axiosInstance from '@/lib/axiosInstance';
import { STEP_ROUTE_MAP } from "@/lib/stepRouteMap";

export default function LoginPage() {
    const router = useRouter();

    // ✅ Cek apakah sudah login
    useEffect(() => {
        document.title = "Login | HealthCare Research";
        const token = localStorage.getItem('token');
        if (token) {
            toast.info('Anda sudah login.');
            window.location.href = "/dashboard";

        }
    }, [router]);


    const handleLogin = async (identifier, password) => {
        try {
            const res = await axiosInstance.post("/auth/login", {
                identifier,
                password,
            });

            const data = res.data;
            toast.success('Login berhasil!');
            localStorage.setItem('token', data.access_token);
            localStorage.setItem("user", JSON.stringify(data.user));

            setTimeout(() => {
                // 🔁 PRIORITAS: last_step
                if (data.user.last_step && STEP_ROUTE_MAP[data.user.last_step]) {
                    window.location.href = STEP_ROUTE_MAP[data.user.last_step];
                    return;
                }

                // fallback jika belum ada step
                window.location.href = "/auth/role-selection";
            }, 500);

        } catch (err) {
            console.error('Error:', err);
            toast.error(
                err.response?.data?.error ||
                "Login gagal. Periksa kembali Nomor Telepon dan password Anda."
            );
        }
    };

    const onNavigateToRegistration = () => {
        router.push("/auth/registration");
    };

    return (
        <Login onNavigateToRegistration={onNavigateToRegistration} handleLogin={handleLogin} />
    )
}
