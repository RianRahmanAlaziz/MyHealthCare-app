"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import NurseDemographics from '@/components/nurse/NurseDemographics'
import { toast } from 'react-toastify'
import axiosInstance from '@/lib/axiosInstance';

export default function DemographicsPage() {
    const router = useRouter();
    useEffect(() => {
        document.title = "Data Demografi Perawat | HealthCare Research";

        const updateLastStep = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;


            await axiosInstance.post("/auth/update-last-step", {
                last_step: "nurse-demographics"
            });

            // simpan juga di localStorage (biar sinkron)
            const user = JSON.parse(localStorage.getItem("user"));
            user.last_step = "nurse-demographics";
            localStorage.setItem("user", JSON.stringify(user));
        };

        updateLastStep();

    }, [router]);

    const onNavigateToEducation = () => {
        router.replace("/nurse/education-module");
    };
    return (
        <NurseDemographics onNavigateToEducation={onNavigateToEducation} />
    )
}
