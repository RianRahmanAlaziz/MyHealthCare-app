"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import EducationModule from '@/components/patient/EducationModule'

export default function EducationModulePage() {
    const router = useRouter();
    useEffect(() => {
        document.title = "E-Modul | HealthCare Research";

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

    const onNavigateToIntervention = () => {
        router.push("/patient/intervention-selection");
    };
    return (
        <EducationModule onNavigateToIntervention={onNavigateToIntervention} />
    )
}
