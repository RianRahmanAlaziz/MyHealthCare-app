"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import NurseDemographics from '@/components/nurse/NurseDemographics'


export default function DemographicsPage() {
    const router = useRouter();
    useEffect(() => {
        document.title = "Data Demografi Perawat | HealthCare Research";

    }, []);

    const onNavigateToZungScale = () => {
        router.push("/nurse/zungscale");
    };
    return (
        <NurseDemographics onNavigateToZungScale={onNavigateToZungScale} />
    )
}
