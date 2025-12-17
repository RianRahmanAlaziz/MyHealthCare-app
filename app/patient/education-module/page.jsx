"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import EducationModule from '@/components/patient/EducationModule'
import axiosInstance from '@/lib/axiosInstance';
import { toast } from 'react-toastify' // ✅ Tambahkan ini

export default function EducationModulePage() {
    const router = useRouter();
    useEffect(() => {
        document.title = "E-Modul | HealthCare Research";

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
                last_step: "education-module"
            });

            // simpan juga di localStorage (biar sinkron)
            const user = JSON.parse(localStorage.getItem("user"));
            user.last_step = "education-module";
            localStorage.setItem("user", JSON.stringify(user));
        };

        updateLastStep();
    }, []);

    const onNavigateToIntervention = () => {
        router.push("/patient/intervention-selection");
    };
    return (
        <EducationModule onNavigateToIntervention={onNavigateToIntervention} />
    )
}
