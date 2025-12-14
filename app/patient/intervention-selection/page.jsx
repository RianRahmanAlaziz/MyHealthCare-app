'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from "react";
import InterventionSelection from '@/components/patient/InterventionSelection'

export default function InterventionSelectionPage() {
    const router = useRouter();
    useEffect(() => {
        document.title = "Teknik Relaksasi | HealthCare Research";

    }, []);

    const onSelectIntervention = ({ id, slug }) => {
        router.push(`/patient/intervention-selection/${slug}?id=${id}`);
    };

    return (
        <InterventionSelection onSelectIntervention={onSelectIntervention} />
    )
}
