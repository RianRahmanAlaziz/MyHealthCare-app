"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ZungScale from '@/components/nurse/ZungScale'
import axiosInstance from '@/lib/axiosInstance';
import { toast } from 'react-toastify' // ✅ Tambahkan ini

export default function KuesionerPage() {
    const router = useRouter();
    useEffect(() => {
        document.title = "Skala Kecemasan Zung (SAS) | HealthCare Research";

        const user = JSON.parse(localStorage.getItem("user"));

        // ❌ Belum login
        if (!user) {
            toast.error("Silakan login terlebih dahulu");
            router.replace("/auth/login");
            return;
        }

        // ❌ Bukan patient
        if (!user.roles?.includes("Pasient")) {
            toast.error("Anda tidak memiliki akses ke halaman ini");
            router.replace("/auth/login");
            return;
        }

        const updateLastStep = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            await axiosInstance.post("/auth/update-last-step", {
                last_step: "zung-scale"
            });

            // simpan juga di localStorage (biar sinkron)
            const user = JSON.parse(localStorage.getItem("user"));
            user.last_step = "zung-scale";
            localStorage.setItem("user", JSON.stringify(user));
        };

        updateLastStep();

    }, []);
    return (
        <ZungScale />
    )
}
