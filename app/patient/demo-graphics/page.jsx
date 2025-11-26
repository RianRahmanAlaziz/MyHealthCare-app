"use client";

import React from 'react'
import { useRouter } from "next/navigation";
import PatientDemographics from '@/components/patient/PatientDemographics'

export default function DemoGraphicsPage() {
    const router = useRouter();

    const onNavigateToZungExplanation = () => {
        router.push("/patient/zung-explanation");
    };

    return (
        <PatientDemographics onNavigateToZungExplanation={onNavigateToZungExplanation} />
    )
}
