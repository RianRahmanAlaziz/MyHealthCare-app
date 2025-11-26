"use client";

import React from 'react'
import { useRouter } from "next/navigation";
import ZungExplanation from '@/components/patient/ZungExplanation'


export default function ZungExplanationPage() {
    const router = useRouter();

    const onNavigateToEducation = () => {
        router.push("/patient/education-module");
    };
    return (
        <ZungExplanation onNavigateToEducation={onNavigateToEducation} />
    )
}
