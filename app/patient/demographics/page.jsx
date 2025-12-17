"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify' // ✅ Tambahkan ini
import 'react-toastify/dist/ReactToastify.css' // ✅ Import CSS
import PatientDemographics from '@/components/patient/PatientDemographics'
import axiosInstance from '@/lib/axiosInstance';

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
            router.replace("/auth/login");
            return;
        }

        const updateLastStep = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            await axiosInstance.post("/auth/update-last-step", {
                last_step: "patient-demographics"
            });

            // simpan juga di localStorage (biar sinkron)
            const user = JSON.parse(localStorage.getItem("user"));
            user.last_step = "patient-demographics";
            localStorage.setItem("user", JSON.stringify(user));
        };

        updateLastStep();

    }, [router]);
    const onNavigateToZungExplanation = () => {
        router.push("/patient/zung-explanation");
    };

    return (
        <PatientDemographics onNavigateToZungExplanation={onNavigateToZungExplanation} />
    )
}
