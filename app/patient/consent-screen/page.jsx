"use client";

import React from 'react'
import { useRouter } from "next/navigation";
import PatientConsentScreen from '@/components/patient/PatientConsentScreen'


export default function ConsentScreenpage() {
    const router = useRouter();

    const onNavigateToDemographics = () => {
        router.push("/patient/demo-graphics");
    };
    return (
        <PatientConsentScreen onNavigateToDemographics={onNavigateToDemographics} />
    )
}
