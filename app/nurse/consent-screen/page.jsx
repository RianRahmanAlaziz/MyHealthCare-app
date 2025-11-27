"use client";
import { useRouter } from "next/navigation";
import NurseConsentScreen from '@/components/nurse/NurseConsentScreen'

export default function ConsentScreenPage() {
    const router = useRouter();

    const onNavigateToDemographics = () => {
        router.push("/nurse/demographics");
    };

    return (
        <NurseConsentScreen onNavigateToDemographics={onNavigateToDemographics} />
    )
}
