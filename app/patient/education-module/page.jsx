"use client";

import React from 'react'
import { useRouter } from "next/navigation";
import EducationModule from '@/components/patient/EducationModule'

export default function EducationModulePage() {
    const router = useRouter();

    const onNavigateToIntervention = () => {
        router.push("/patient/intervention-selection");
    };
    return (
        <EducationModule onNavigateToIntervention={onNavigateToIntervention} />
    )
}
