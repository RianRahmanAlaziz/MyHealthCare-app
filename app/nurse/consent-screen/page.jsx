"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import NurseConsentScreen from '@/components/nurse/NurseConsentScreen'
import { toast } from 'react-toastify'
import axiosInstance from '@/lib/axiosInstance';

export default function ConsentScreenPage() {
    const router = useRouter();
    useEffect(() => {
        document.title = "Informed Consent Perawat | HealthCare Research";

        const user = JSON.parse(localStorage.getItem("user"));
        // ❌ Belum login
        if (!user) {
            toast.error("Silakan login terlebih dahulu");
            router.replace("/auth/login");
            return;
        }

        // ❌ Bukan patient
        if (!user.roles?.includes("Perawat")) {
            toast.error("Anda tidak memiliki akses ke halaman ini");
            router.replace("/");
            return;
        }

        const updateLastStep = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            await axiosInstance.post("/auth/update-last-step", {
                last_step: "nurse-consent"
            });

            // simpan juga di localStorage (biar sinkron)
            const user = JSON.parse(localStorage.getItem("user"));
            user.last_step = "nurse-consent";
            localStorage.setItem("user", JSON.stringify(user));
        };

        updateLastStep();

    }, [router]);

    const onNavigateToDemographics = () => {
        router.push("/nurse/demographics");
    };

    return (
        <NurseConsentScreen onNavigateToDemographics={onNavigateToDemographics} />
    )
}
