"use client";

import React from 'react'
import { useEffect } from 'react';
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify' // ✅ Tambahkan ini
import 'react-toastify/dist/ReactToastify.css' // ✅ Import CSS
import Login from '@/components/auth/Login'
import axiosInstance from '@/lib/axiosInstance';

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

            const roles = data.user.roles; // ⬅ dari API (array)
            setTimeout(() => {
                // Tidak punya role → route ke role selection
                if (!roles || roles.length === 0) {
                    window.location.href = "/auth/role-selection";
                }
                // Role admin → route dashboard
                else if (roles.includes("Admin")) {
                    window.location.href = "/dashboard";
                }
                // Jika ada role lain (optional)
                else if (roles.includes("Perawat")) {
                    window.location.href = "/dashboard"; // atau redirect lain
                } else if (roles.includes("Pasient")) {
                    window.location.href = "/dashboard"; // atau redirect lain
                }
            }, 800);
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
