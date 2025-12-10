'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from "react";
import InterventionSelection from '@/components/patient/InterventionSelection'

export default function InterventionSelectionPage() {
    const router = useRouter();
    useEffect(() => {
        document.title = "Teknik Relaksasi | HealthCare Research";

    }, []);
    const onSelectIntervention = (selected) => {
        router.push(`/patient/intervention-selection/${selected}`);
    };
    return (
        <InterventionSelection onSelectIntervention={onSelectIntervention} />
    )
}
