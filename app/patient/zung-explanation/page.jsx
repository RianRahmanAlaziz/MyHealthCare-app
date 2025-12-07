"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import ZungExplanation from '@/components/patient/ZungExplanation'


export default function ZungExplanationPage() {
    const router = useRouter();
    useEffect(() => {
        document.title = "Skala Kecemasan Zung | HealthCare Research";

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
    const onNavigateToEducation = () => {
        router.push("/patient/education-module");
    };
    return (
        <ZungExplanation onNavigateToEducation={onNavigateToEducation} />
    )
}
