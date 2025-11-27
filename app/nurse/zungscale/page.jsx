"use client";

import React from 'react'
import { useRouter } from "next/navigation";
import ZungScale from '@/components/nurse/ZungScale'

export default function ZungScalePage() {
    const router = useRouter();

    const onNavigateToEducation = () => {
        router.push("/nurse/education-module");
    };
    return (
        <ZungScale onNavigateToEducation={onNavigateToEducation} />
    )
}
