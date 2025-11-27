'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import InterventionSelection from '@/components/patient/InterventionSelection'

export default function InterventionSelectionPage() {
    const router = useRouter();

    const onSelectIntervention = (selected) => {
        router.push(`/patient/intervention-selection/${selected}`);
    };
    return (
        <InterventionSelection onSelectIntervention={onSelectIntervention} />
    )
}
