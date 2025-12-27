"use client";

import { useEffect } from 'react'
import { useRouter } from "next/navigation";
import NurseEducationModule from '@/components/nurse/NurseEducationModule'
import { toast } from 'react-toastify'
import axiosInstance from '@/lib/axiosInstance';

export default function NurseEducationModulePage() {
    const router = useRouter();
    useEffect(() => {
        document.title = "E-Module Edukasi Perawat | HealthCare Research";

        const updateLastStep = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            await axiosInstance.post("/auth/update-last-step", {
                last_step: "nurse-education"
            });

            // simpan juga di localStorage (biar sinkron)
            const user = JSON.parse(localStorage.getItem("user"));
            user.last_step = "nurse-education";
            localStorage.setItem("user", JSON.stringify(user));
        };

        updateLastStep();

    }, [router]);

    const onNavigateToLoginDashboard = () => {
        router.push("/dashboard");
    };
    return (
        <NurseEducationModule onNavigateToLoginDashboard={onNavigateToLoginDashboard} />
    )
}
