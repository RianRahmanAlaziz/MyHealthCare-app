"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import NurseConsentScreen from '@/components/nurse/NurseConsentScreen'

export default function ConsentScreenPage() {
    const router = useRouter();
    useEffect(() => {
        document.title = "Informed Consent Perawat | HealthCare Research";

    }, []);

    const onNavigateToDemographics = () => {
        router.push("/nurse/demographics");
    };

    return (
        <NurseConsentScreen onNavigateToDemographics={onNavigateToDemographics} />
    )
}
