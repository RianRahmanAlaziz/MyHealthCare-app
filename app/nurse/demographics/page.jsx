"use client";
import { useRouter } from "next/navigation";
import NurseDemographics from '@/components/nurse/NurseDemographics'


export default function DemographicsPage() {
    const router = useRouter();

    const onNavigateToZungScale = () => {
        router.push("/nurse/zungscale");
    };
    return (
        <NurseDemographics onNavigateToZungScale={onNavigateToZungScale} />
    )
}
