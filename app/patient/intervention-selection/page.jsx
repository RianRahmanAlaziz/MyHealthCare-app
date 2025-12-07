'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from "react";
import InterventionSelection from '@/components/patient/InterventionSelection'

export default function InterventionSelectionPage() {
    const router = useRouter();
    useEffect(() => {
        document.title = "Teknik Relaksasi | HealthCare Research";

        // const user = JSON.parse(sessionStorage.getItem("user"));

        // // ❌ Belum login
        // if (!user) {
        //     toast.error("Silakan login terlebih dahulu");
        //     router.replace("/auth/login");
        //     return;
        // }

        // // ❌ Bukan patient
        // if (!user.roles?.includes("Pasient")) {
        //     toast.error("Anda tidak memiliki akses ke halaman ini");
        //     router.replace("/");
        //     return;
        // }
    }, []);
    const onSelectIntervention = (selected) => {
        router.push(`/patient/intervention-selection/${selected}`);
    };
    return (
        <InterventionSelection onSelectIntervention={onSelectIntervention} />
    )
}
