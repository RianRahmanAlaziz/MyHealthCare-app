"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
import PatientConsentScreen from '@/components/patient/PatientConsentScreen'


export default function ConsentScreenpage() {
    const router = useRouter();
    useEffect(() => {
        document.title = "Informed Consent Pasien | HealthCare Research";
        const user = JSON.parse(sessionStorage.getItem("user"));

        // ❌ Belum login
        if (!user) {
            toast.error("Silakan login terlebih dahulu");
            router.replace("/auth/login");
            return;
        }

        // ❌ Bukan patient
        if (!user.roles?.includes("Pasient")) {
            toast.error("Anda tidak memiliki akses ke halaman ini");
            router.replace("/");
            return;
        }
    }, [router]);
    const onNavigateToDemographics = () => {
        router.push("/patient/demo-graphics");
    };
    return (
        <PatientConsentScreen onNavigateToDemographics={onNavigateToDemographics} />
    )
}
