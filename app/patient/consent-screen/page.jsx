"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import PatientConsentScreen from '@/components/patient/PatientConsentScreen'
import axiosInstance from '@/lib/axiosInstance';

export default function ConsentScreenpage() {
    const router = useRouter();
    useEffect(() => {
        document.title = "Informed Consent Pasien | HealthCare Research";

        const updateLastStep = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            await axiosInstance.post("/auth/update-last-step", {
                last_step: "patient-consent"
            });

            // simpan juga di localStorage (biar sinkron)
            const user = JSON.parse(localStorage.getItem("user"));
            user.last_step = "patient-consent";
            localStorage.setItem("user", JSON.stringify(user));
        };

        updateLastStep();

    }, [router]);
    const onNavigateToDemographics = () => {
        router.push("/patient/demographics");
    };
    return (
        <PatientConsentScreen onNavigateToDemographics={onNavigateToDemographics} />
    )
}
