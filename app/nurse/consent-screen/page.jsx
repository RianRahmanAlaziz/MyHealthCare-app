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
