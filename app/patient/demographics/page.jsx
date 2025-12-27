"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import PatientDemographics from '@/components/patient/PatientDemographics'
import axiosInstance from '@/lib/axiosInstance';

export default function DemoGraphicsPage() {
    const router = useRouter();
    useEffect(() => {
        document.title = "Data Demografi Pasien | HealthCare Research";

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
