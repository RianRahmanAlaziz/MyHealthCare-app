"use client";

import { useEffect } from 'react'
import { useRouter } from "next/navigation";
import NurseEducationModule from '@/components/nurse/NurseEducationModule'

export default function NurseEducationModulePage() {
    const router = useRouter();
    useEffect(() => {
        document.title = "E-Module Edukasi Perawat | HealthCare Research";

    }, []);
    return (
        <NurseEducationModule />
    )
}
