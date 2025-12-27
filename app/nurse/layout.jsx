"use client";

import "@/style/css/home.css"
import { useEffect } from 'react'
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css' // ✅ Import CSS

export default function NurseLayout({ children }) {
    const router = useRouter();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");
        // ❌ Belum login
        if (!user || !token) {
            toast.error("Silakan login terlebih dahulu");
            router.replace("/auth/login");
            return;
        }

        // ❌ Bukan patient
        if (!user.roles?.includes("Perawat")) {
            toast.error("Anda tidak memiliki akses ke halaman ini");
            router.replace("/auth/login");
            return;
        }

    }, [router]);

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 via-teal-50 to-white">
            {children}
        </div>
    )
}
