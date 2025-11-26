"use client";

import React from 'react'
import { useRouter } from "next/navigation";
import EducationModule from '@/components/module/pasien/EducationModule'

export default function EducationModulePage() {
    const router = useRouter();

    const onNavigateToIntervention = () => {
        router.push("/patient/intervention-selection");
    };
    return (
        <EducationModule onNavigateToIntervention={onNavigateToIntervention} />
    )
}
