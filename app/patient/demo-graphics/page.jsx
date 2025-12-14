"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify' // ✅ Tambahkan ini
import 'react-toastify/dist/ReactToastify.css' // ✅ Import CSS
import PatientDemographics from '@/components/patient/PatientDemographics'

export default function DemoGraphicsPage() {
    const router = useRouter();
    useEffect(() => {
        document.title = "Data Demografi Pasien | HealthCare Research";

        const user = JSON.parse(localStorage.getItem("user"));

        // ❌ Belum login
        if (!user) {
            toast.error("Silakan login terlebih dahulu");
            router.replace("/auth/login");
            return;
        }

        // ❌ Bukan patient
        if (!user.roles?.includes("Pasient")) {
            toast.error("Anda tidak memiliki akses ke halaman ini");
            router.replace("/");
            return;
        }
    }, [router]);
    const onNavigateToZungExplanation = () => {
        router.push("/patient/zung-explanation");
    };

    return (
        <PatientDemographics onNavigateToZungExplanation={onNavigateToZungExplanation} />
    )
}
